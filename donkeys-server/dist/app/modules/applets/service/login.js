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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0g7QUFDdEgsMkJBQTJCO0FBRTNCLG1EQUE4RDtBQUM5RCw0Q0FBd0Y7QUFHeEYseUNBQW1EO0FBQ25ELHFDQUFxQztBQUNyQyx1Q0FBa0Q7QUFHbEQsb0NBQW9DO0FBR3BDOztHQUVHO0FBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxrQkFBVztJQWFoRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQWlCO1FBQ3pCLFVBQVU7UUFDVixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlCLFdBQVc7UUFDWCwyREFBMkQ7UUFDM0QsK0NBQStDO1FBQy9DLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzlELGlCQUFpQjtRQUNqQixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLElBQUksU0FBUyxHQUFHLE1BQU0scUJBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2SCxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUNwQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxD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