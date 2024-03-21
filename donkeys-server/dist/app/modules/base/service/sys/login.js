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
exports.BaseSysLoginService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const svgCaptcha = require("svg-captcha");
const uuid_1 = require("uuid");
const user_1 = require("../../entity/sys/user");
const typeorm_1 = require("typeorm");
const orm_1 = require("@midwayjs/orm");
const md5 = require("md5");
const role_1 = require("./role");
const _ = require("lodash");
const menu_1 = require("./menu");
const department_1 = require("./department");
const jwt = require("jsonwebtoken");
const svgToDataURL = require("mini-svg-data-uri");
/**
 * 登录
 */
let BaseSysLoginService = class BaseSysLoginService extends core_1.BaseService {
    /**
     * 登录
     * @param login
     */
    async login(login) {
        const { username, captchaId, verifyCode, password } = login;
        // 校验验证码
        const checkV = await this.captchaCheck(captchaId, verifyCode);
        if (checkV) {
            const user = await this.baseSysUserEntity.findOne({ username });
            // 校验用户
            if (user) {
                // 校验用户状态及密码
                if (user.status === 0 || user.password !== md5(password)) {
                    throw new core_1.CoolCommException('账户或密码不正确~');
                }
            }
            else {
                throw new core_1.CoolCommException('账户或密码不正确~');
            }
            // 校验角色
            const roleIds = await this.baseSysRoleService.getByUser(user.id);
            if (_.isEmpty(roleIds)) {
                throw new core_1.CoolCommException('该用户未设置任何角色，无法登录~');
            }
            // 生成token
            const { expire, refreshExpire } = this.coolConfig.jwt.token;
            const result = {
                expire,
                token: await this.generateToken(user, roleIds, expire),
                refreshExpire,
                refreshToken: await this.generateToken(user, roleIds, refreshExpire, true)
            };
            // 将用户相关信息保存到缓存
            const perms = await this.baseSysMenuService.getPerms(roleIds);
            const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, user.username === 'admin');
            await this.coolCache.set(`admin:department:${user.id}`, JSON.stringify(departments));
            await this.coolCache.set(`admin:perms:${user.id}`, JSON.stringify(perms));
            await this.coolCache.set(`admin:token:${user.id}`, result.token);
            await this.coolCache.set(`admin:token:refresh:${user.id}`, result.token);
            return result;
        }
        else {
            throw new core_1.CoolCommException('验证码不正确');
        }
    }
    /**
     * 验证码
     * @param type 图片验证码类型 svg
     * @param width 宽
     * @param height 高
     */
    async captcha(type, width = 150, height = 50) {
        const svg = svgCaptcha.create({
            ignoreChars: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
            width,
            height
        });
        const result = {
            captchaId: uuid_1.v1(),
            data: svg.data.replace(/"/g, "'")
        };
        // 文字变白
        const rpList = ['#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999'];
        rpList.forEach((rp) => {
            result.data = result.data['replaceAll'](rp, '#fff');
        });
        if (type === 'base64') {
            result.data = svgToDataURL(result.data);
        }
        // 半小时过期
        await this.coolCache.set(`verify:img:${result.captchaId}`, svg.text.toLowerCase(), 1800);
        return result;
    }
    /**
     * 退出登录
     */
    async logout() {
        const { userId } = this.ctx.admin;
        await this.coolCache.del(`admin:department:${userId}`);
        await this.coolCache.del(`admin:perms:${userId}`);
        await this.coolCache.del(`admin:token:${userId}`);
        await this.coolCache.del(`admin:token:refresh:${userId}`);
    }
    /**
     * 检验图片验证码
     * @param captchaId 验证码ID
     * @param value 验证码
     */
    async captchaCheck(captchaId, value) {
        const rv = await this.coolCache.get(`verify:img:${captchaId}`);
        if (!rv || !value || value.toLowerCase() !== rv) {
            return false;
        }
        else {
            this.coolCache.del(`verify:img:${captchaId}`);
            return true;
        }
    }
    /**
     * 生成token
     * @param user 用户对象
     * @param roleIds 角色集合
     * @param expire 过期
     * @param isRefresh 是否是刷新
     */
    async generateToken(user, roleIds, expire, isRefresh) {
        await this.coolCache.set(`admin:passwordVersion:${user.id}`, user.passwordV);
        const tokenInfo = {
            isRefresh: false,
            roleIds,
            username: user.username,
            userId: user.id,
            passwordVersion: user.passwordV
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
                await this.coolCache.set(`admin:passwordVersion:${decoded['userId']}`, decoded['passwordVersion']);
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
};
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "coolCache", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysLoginService.prototype, "baseSysUserEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", role_1.BaseSysRoleService)
], BaseSysLoginService.prototype, "baseSysRoleService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseSysLoginService.prototype, "baseSysMenuService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", department_1.BaseSysDepartmentService)
], BaseSysLoginService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "ctx", void 0);
__decorate([
    decorator_1.Config('module.base'),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "coolConfig", void 0);
BaseSysLoginService = __decorate([
    decorator_1.Provide()
], BaseSysLoginService);
exports.BaseSysLoginService = BaseSysLoginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThEO0FBQzlELDRDQUFvRztBQUVwRywwQ0FBMEM7QUFDMUMsK0JBQWtDO0FBQ2xDLGdEQUEwRDtBQUMxRCxxQ0FBcUM7QUFDckMsdUNBQWtEO0FBQ2xELDJCQUEyQjtBQUMzQixpQ0FBNEM7QUFDNUMsNEJBQTRCO0FBQzVCLGlDQUE0QztBQUM1Qyw2Q0FBd0Q7QUFDeEQsb0NBQW9DO0FBRXBDLGtEQUFrRDtBQUVsRDs7R0FFRztBQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsa0JBQVc7SUFzQmhEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBZTtRQUN2QixNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzVELFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlELElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNoRSxPQUFPO1lBQ1AsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sWUFBWTtnQkFDWixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN0RCxNQUFNLElBQUksd0JBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQzVDO2FBQ0o7aUJB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