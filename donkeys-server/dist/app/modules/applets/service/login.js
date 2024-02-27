"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppletsLoginService = void 0;
const tnwx_1 = require("tnwx");
const R = require("ramda");
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const user_1 = require("../entity/user");
const typeorm_1 = require("typeorm");
const orm_1 = require("@midwayjs/orm");
const jwt = require("jsonwebtoken");
/**
 * 登录
 */
let AppletsLoginService = class AppletsLoginService extends core_1.BaseService {
    /**
     * 登录
     * @param login
     */
    async login(login) {
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
            let sessinObj = await tnwx_1.MiniProgramApi.code2Session(this.coolConfig.applets.appId, this.coolConfig.applets.secret, code);
            session_key = sessinObj.session_key;
            openid = sessinObj.openid;
        }
        if (R.isNil(session_key)) {
            throw new core_1.CoolCommException('参数错误');
        }
        else {
            let key = Buffer.from(session_key, 'base64');
            let baseIv = Buffer.from(iv, 'base64');
            let signature2 = tnwx_1.Kits.sha1(rawData + session_key);
            if (signature2 === signature) {
                let ecrypt = tnwx_1.Kits.aes128cbcDecrypt(key, baseIv, encryptedData);
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
                    dbUserInfo = { ...new user_1.AppletsUserEntity(), ...appletsUserInfo, historyCount: 0, collectCount: 0 };
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
            }
            else {
                throw new core_1.CoolCommException('签名错误');
            }
        }
    }
    /**
     * 登录
     * @param login
     */
    async loginBefore(login) {
        // 小程序相关配置
        await this.setAppletsParams();
        let userInfo = null;
        const { code } = login;
        // 获取 session_key
        let sessinObj = await tnwx_1.MiniProgramApi.code2Session(this.coolConfig.applets.appId, this.coolConfig.applets.secret, code);
        if (R.isNil(sessinObj) || !sessinObj.openid) {
            throw new core_1.CoolCommException('参数错误');
        }
        else {
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
    async generateToken(user, expire, isRefresh) {
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
    async refreshToken(token) {
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
        }
        catch (err) {
            console.log(err);
            this.ctx.status = 401;
            this.ctx.body = {
                code: core_1.RESCODE.COMMFAIL,
                message: '登录失效~'
            };
            return;
        }
    }
    /* 设置微信小程序配置 */
    async setAppletsParams() {
        // 小程序配置
        let devApiConfig = new tnwx_1.ApiConfig(this.coolConfig.applets.appId, this.coolConfig.applets.secret, 'test');
        // 微信公众号、微信小程序、微信小游戏 支持多应用
        tnwx_1.ApiConfigKit.putApiConfig(devApiConfig);
        // 开启开发模式,方便调试
        tnwx_1.ApiConfigKit.devMode = true;
        // 设置当前应用
        tnwx_1.ApiConfigKit.setCurrentAppId(devApiConfig.getAppId);
        // 设置缓存
        tnwx_1.ApiConfigKit.setCache = {
            get: (key) => this.coolCache.get(key),
            set: (key, jsonValue) => this.coolCache.set(key, jsonValue),
            remove: (key) => this.coolCache.del(key)
        };
    }
};
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], AppletsLoginService.prototype, "coolCache", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsLoginService.prototype, "appletsUserEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], AppletsLoginService.prototype, "ctx", void 0);
__decorate([
    decorator_1.Config('module.applets'),
    __metadata("design:type", Object)
], AppletsLoginService.prototype, "coolConfig", void 0);
AppletsLoginService = __decorate([
    decorator_1.Provide()
], AppletsLoginService);
exports.AppletsLoginService = AppletsLoginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL3NlcnZpY2UvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXNIO0FBQ3RILDJCQUEyQjtBQUUzQixtREFBOEQ7QUFDOUQsNENBQXdGO0FBR3hGLHlDQUFtRDtBQUNuRCxxQ0FBcUM7QUFDckMsdUNBQWtEO0FBR2xELG9DQUFvQztBQUdwQzs7R0FFRztBQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsa0JBQVc7SUFhaEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFpQjtRQUN6QixVQUFVO1FBQ1YsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QixXQUFXO1FBQ1gsMkRBQTJEO1FBQzNELCtDQUErQztRQUMvQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztRQUM5RCxpQkFBaUI7UUFDakIsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxJQUFJLFNBQVMsR0FBRyxNQUFNLHFCQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkgsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDcEMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFDSCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLFVBQVUsR0FBRyxXQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQztZQUNsRCxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLElBQUksTUFBTSxHQUFHLFdBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtvQkFDekIsZUFBZSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7aUJBQ25DO2dCQUNELFNBQVM7Z0JBQ1QsSUFBSSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCO3FCQUN4QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7cUJBQ3ZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQy9ELHVCQUF1QixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQztxQkFDdkQsdUJBQXVCLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDO3FCQUN2RCxNQUFNLEVBQUUsQ0FBQztnQkFDZCxpQkFBaUI7Z0JBQ2pCLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUM5QyxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksd0JBQWlCLEVBQUUsRUFBRSxHQUFHLGVBQWUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDbEcsVUFBVSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDO2lCQUNsRDtnQkFDRCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLFVBQVU7Z0JBQ1YsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQzVELE1BQU0sTUFBTSxHQUFHO29CQUNYLEdBQUcsVUFBVTtvQkFDYixNQUFNO29CQUNOLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztvQkFDbkQsYUFBYTtvQkFDYixZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDO2lCQUMxRSxDQUFDO2dCQUNGLGdCQUFnQjtnQkFDaEIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekUsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakYsT0FBTyxNQUFNLENBQUM7YUFDakI7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0o7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUF1QjtRQUNyQyxVQUFVO1FBQ1YsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztRQUN2QixpQkFBaUI7UUFDakIsSUFBSSxTQUFTLEdBQUcsTUFBTSxxQkFBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZILElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDekMsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFDSCxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCO2lCQUNsQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7aUJBQ3ZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3pELHVCQUF1QixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQztpQkFDdkQsTUFBTSxFQUFFLENBQUM7U0FDakI7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsT0FBTztnQkFDSCxJQUFJLEVBQUUsSUFBSTtnQkFDVixHQUFHLFNBQVM7YUFDZixDQUFDO1NBQ0w7UUFDRCxVQUFVO1FBQ1YsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDNUQsTUFBTSxNQUFNLEdBQUc7WUFDWCxHQUFHLFFBQVE7WUFDWCxNQUFNO1lBQ04sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2pELGFBQWE7WUFDYixZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDO1NBQ3hFLENBQUM7UUFDRixnQkFBZ0I7UUFDaEIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RSxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHlCQUF5QixRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9FLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFVO1FBQ3hDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsTUFBTSxTQUFTLEdBQUc7WUFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDZixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDdEIsQ0FBQztRQUNGLElBQUksU0FBUyxFQUFFO1lBQ1gsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNuRCxTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFhO1FBQzVCLElBQUk7WUFDQSxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5RCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFdEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQzVELE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzdCLE1BQU0sTUFBTSxHQUFHO29CQUNYLE1BQU07b0JBQ04sS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTt3QkFDakQsU0FBUyxFQUFFLE1BQU07cUJBQ3BCLENBQUM7b0JBQ0YsYUFBYTtvQkFDYixZQUFZLEVBQUUsRUFBRTtpQkFDbkIsQ0FBQztnQkFDRixPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixNQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDaEUsU0FBUyxFQUFFLGFBQWE7aUJBQzNCLENBQUMsQ0FBQztnQkFDSCxPQUFPLE1BQU0sQ0FBQzthQUNqQjtTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDWixJQUFJLEVBQUUsY0FBTyxDQUFDLFFBQVE7Z0JBQ3RCLE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUM7WUFDRixPQUFPO1NBQ1Y7SUFDTCxDQUFDO0lBQ0QsZUFBZTtJQUNmLEtBQUssQ0FBQyxnQkFBZ0I7UUFDbEIsUUFBUTtRQUNSLElBQUksWUFBWSxHQUFHLElBQUksZ0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hHLDBCQUEwQjtRQUMxQixtQkFBWSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxjQUFjO1FBQ2QsbUJBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzVCLFNBQVM7UUFDVCxtQkFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsT0FBTztRQUNQLG1CQUFZLENBQUMsUUFBUSxHQUFHO1lBQ3BCLEdBQUcsRUFBRSxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQzdDLEdBQUcsRUFBRSxDQUFDLEdBQVcsRUFBRSxTQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO1lBQzNFLE1BQU0sRUFBRSxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ25ELENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQWpNRztJQURDLGtCQUFNLENBQUMsWUFBWSxDQUFDOztzREFDQztBQUd0QjtJQURDLHVCQUFpQixDQUFDLHdCQUFpQixDQUFDOzhCQUNsQixvQkFBVTs4REFBb0I7QUFHakQ7SUFEQyxrQkFBTSxFQUFFOztnREFDSTtBQUdiO0lBREMsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7dURBQ0w7QUFYWCxtQkFBbUI7SUFEL0IsbUJBQU8sRUFBRTtHQUNHLG1CQUFtQixDQW1NL0I7QUFuTVksa0RBQW1CIn0=