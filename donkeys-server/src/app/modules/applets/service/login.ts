import { Kits /* , accesstoken, cache */, ApiConfigKit, ApiConfig, /* AccessTokenApi, */ MiniProgramApi } from 'tnwx';
import * as R from 'ramda';

import { Inject, Provide, Config } from '@midwayjs/decorator';
import { BaseService, ICoolCache, CoolCommException, RESCODE } from '@cool-midway/core';
import { Iconfig } from '../config';
import { WeLoginByCodeDTO, WeLoginDTO } from '../dto/login';
import { AppletsUserEntity } from '../entity/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
// import * as md5 from 'md5';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import { Context } from 'egg';

/**
 * 登录
 */
@Provide()
export class AppletsLoginService extends BaseService {
    @Inject('cool:cache')
    coolCache: ICoolCache;

    @InjectEntityModel(AppletsUserEntity)
    appletsUserEntity: Repository<AppletsUserEntity>;

    @Inject()
    ctx: Context;

    @Config('module.applets')
    coolConfig: Iconfig;

    /**
     * 登录
     * @param login
     */
    async login(login: WeLoginDTO) {
        // 小程序相关配置
        await this.setAppletsParams();
        // 获取 token
        // let accessToken = await AccessTokenApi.getAccessToken();
        // let session_key = accessToken.getAccessToken
        const { signature, rawData, iv, encryptedData, code } = login;
        // 获取 session_key
        let session_key = login.session_key;
        let openid = login.openid;
        if (!session_key) {
            let sessinObj = await MiniProgramApi.code2Session(this.coolConfig.applets.appId, this.coolConfig.applets.secret, code);
            session_key = sessinObj.session_key;
            openid = sessinObj.openid;
        }

        if (R.isNil(session_key)) {
            throw new CoolCommException('参数错误');
        } else {
            let key = Buffer.from(session_key, 'base64');
            let baseIv = Buffer.from(iv, 'base64');
            let signature2 = Kits.sha1(rawData + session_key);
            if (signature2 === signature) {
                let ecrypt = Kits.aes128cbcDecrypt(key, baseIv, encryptedData);
                let appletsUserInfo = JSON.parse(ecrypt);

                if (!appletsUserInfo.openId) {
                    appletsUserInfo.openId = openid;
                }
                // 保存用户信息
                let dbUserInfo = await this.appletsUserEntity
                    .createQueryBuilder('c')
                    .where('c.openId = :openId', { openId: appletsUserInfo.openId })
                    .loadRelationCountAndMap('c.collectCount', 'c.collects')
                    .loadRelationCountAndMap('c.historyCount', 'c.historys')
                    .getOne();
                // return ecrypt;
                if (R.isNil(dbUserInfo) || R.isEmpty(dbUserInfo)) {
                    dbUserInfo = { ...new AppletsUserEntity(), ...appletsUserInfo, historyCount: 0, collectCount: 0 };
                    dbUserInfo.username = appletsUserInfo.nickName;
                }
                await this.appletsUserEntity.save(dbUserInfo);
                // 生成token
                const { expire, refreshExpire } = this.coolConfig.jwt.token;
                const result = {
                    ...dbUserInfo,
                    expire,
                    token: await this.generateToken(dbUserInfo, expire),
                    refreshExpire,
                    refreshToken: await this.generateToken(dbUserInfo, refreshExpire, true)
                };
                // 将用户相关信息保存到缓存.
                await this.coolCache.set(`applets:token:${dbUserInfo.id}`, result.token);
                await this.coolCache.set(`applets:token:refresh:${dbUserInfo.id}`, result.token);
                return result;
            } else {
                throw new CoolCommException('签名错误');
            }
        }
    }
    /**
     * 登录
     * @param login
     */
    async loginBefore(login: WeLoginByCodeDTO) {
        // 小程序相关配置
        await this.setAppletsParams();
        let userInfo = null;
        const { code } = login;
        // 获取 session_key
        let sessinObj = await MiniProgramApi.code2Session(this.coolConfig.applets.appId, this.coolConfig.applets.secret, code);
        if (R.isNil(sessinObj) || !sessinObj.openid) {
            throw new CoolCommException('参数错误');
        } else {
            userInfo = await this.appletsUserEntity
                .createQueryBuilder('c')
                .where('c.openId = :openId', { openId: sessinObj.openid })
                .loadRelationCountAndMap('c.collectCount', 'c.collects')
                .getOne();
        }
        if (!userInfo) {
            return {
                code: code,
                ...sessinObj
            };
        }
        // 生成token
        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        const result = {
            ...userInfo,
            expire,
            token: await this.generateToken(userInfo, expire),
            refreshExpire,
            refreshToken: await this.generateToken(userInfo, refreshExpire, true)
        };
        // 将用户相关信息保存到缓存.
        await this.coolCache.set(`applets:token:${userInfo.id}`, result.token);
        await this.coolCache.set(`applets:token:refresh:${userInfo.id}`, result.token);
        return result;
    }

    /**
     * 生成 token
     * @param user 用户对象
     * @param expire 过期
     * @param isRefresh 是否是刷新
     */
    async generateToken(user, expire, isRefresh?) {
        await this.coolCache.set(`applets:openId:${user.id}`, user.openId);
        const tokenInfo = {
            userId: user.id,
            isRefresh: false,
            avatarUrl: user.avatarUrl,
            gender: user.gender,
            username: user.nickName,
            openId: user.openId
        };
        if (isRefresh) {
            tokenInfo.isRefresh = true;
        }
        return jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
            expiresIn: expire
        });
    }
    /**
     * 刷新token
     * @param token
     */
    async refreshToken(token: string) {
        try {
            const decoded = jwt.verify(token, this.coolConfig.jwt.secret);
            if (decoded && decoded['isRefresh']) {
                delete decoded['exp'];
                delete decoded['iat'];

                const { expire, refreshExpire } = this.coolConfig.jwt.token;
                decoded['isRefresh'] = false;
                const result = {
                    expire,
                    token: jwt.sign(decoded, this.coolConfig.jwt.secret, {
                        expiresIn: expire
                    }),
                    refreshExpire,
                    refreshToken: ''
                };
                decoded['isRefresh'] = true;
                result.refreshToken = jwt.sign(decoded, this.coolConfig.jwt.secret, {
                    expiresIn: refreshExpire
                });
                return result;
            }
        } catch (err) {
            console.log(err);
            this.ctx.status = 401;
            this.ctx.body = {
                code: RESCODE.COMMFAIL,
                message: '登录失效~'
            };
            return;
        }
    }
    /* 设置微信小程序配置 */
    async setAppletsParams() {
        // 小程序配置
        let devApiConfig = new ApiConfig(this.coolConfig.applets.appId, this.coolConfig.applets.secret, 'test');
        // 微信公众号、微信小程序、微信小游戏 支持多应用
        ApiConfigKit.putApiConfig(devApiConfig);
        // 开启开发模式,方便调试
        ApiConfigKit.devMode = true;
        // 设置当前应用
        ApiConfigKit.setCurrentAppId(devApiConfig.getAppId);
        // 设置缓存
        ApiConfigKit.setCache = {
            get: (key: string) => this.coolCache.get(key),
            set: (key: string, jsonValue: string) => this.coolCache.set(key, jsonValue),
            remove: (key: string) => this.coolCache.del(key)
        };
    }
}
