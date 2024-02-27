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
exports.BaseAuthorityMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const _ = require("lodash");
const core_1 = require("@cool-midway/core");
const jwt = require("jsonwebtoken");
/**
 * 权限校验
 */
let BaseAuthorityMiddleware = class BaseAuthorityMiddleware {
    resolve() {
        return async (ctx, next) => {
            let statusCode = 200;
            let { url } = ctx;
            const { prefix } = this.coolConfig.router;
            url = url.replace(prefix, '');
            const token = ctx.get('Authorization');
            const adminUrl = '/admin/';
            // 路由地址为 admin前缀的 需要权限校验
            if (_.startsWith(url, adminUrl)) {
                try {
                    ctx.admin = jwt.verify(token, this.jwtConfig.jwt.secret);
                }
                catch (err) { }
                // 不需要登录 无需权限校验
                if (new RegExp(`^${adminUrl}?.*/open/`).test(url)) {
                    await next();
                    return;
                }
                if (ctx.admin) {
                    // 超管拥有所有权限
                    if (ctx.admin.username == 'admin' && !ctx.admin.isRefresh) {
                        await next();
                        return;
                    }
                    // 要登录每个人都有权限的接口
                    if (new RegExp(`^${adminUrl}?.*/comm/`).test(url)) {
                        await next();
                        return;
                    }
                    // 小程序权限控制的接口
                    if (new RegExp(`^${adminUrl}applet/`).test(url)) {
                        console.log('ctx.admin');
                        console.log('ctx.admin');
                        console.log(ctx.admin);
                        await next();
                        return;
                    }
                    // 如果传的token是refreshToken则校验失败
                    if (ctx.admin.isRefresh) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登录失效~'
                        };
                        return;
                    }
                    // 需要动态获得缓存
                    this.coolCache = await ctx.requestContext.getAsync('cool:cache');
                    // 判断密码版本是否正确
                    const passwordV = await this.coolCache.get(`admin:passwordVersion:${ctx.admin.userId}`);
                    if (passwordV != ctx.admin.passwordVersion) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登录失效~'
                        };
                        return;
                    }
                    const rToken = await this.coolCache.get(`admin:token:${ctx.admin.userId}`);
                    if (!rToken) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登录失效或无权限访问~'
                        };
                        return;
                    }
                    if (rToken !== token && this.coolConfig.sso) {
                        statusCode = 401;
                    }
                    else {
                        let perms = await this.coolCache.get(`admin:perms:${ctx.admin.userId}`);
                        if (!_.isEmpty(perms)) {
                            perms = JSON.parse(perms).map((e) => {
                                return e.replace(/:/g, '/');
                            });
                            if (!perms.includes(url.split('?')[0].replace('/admin/', ''))) {
                                statusCode = 403;
                            }
                        }
                        else {
                            statusCode = 403;
                        }
                    }
                }
                else {
                    statusCode = 401;
                }
                if (statusCode > 200) {
                    ctx.status = statusCode;
                    ctx.body = {
                        code: core_1.RESCODE.COMMFAIL,
                        message: '登录失效或无权限访问~'
                    };
                    return;
                }
            }
            await next();
        };
    }
};
__decorate([
    decorator_1.Config('cool'),
    __metadata("design:type", Object)
], BaseAuthorityMiddleware.prototype, "coolConfig", void 0);
__decorate([
    decorator_1.Config('module.base'),
    __metadata("design:type", Object)
], BaseAuthorityMiddleware.prototype, "jwtConfig", void 0);
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], BaseAuthorityMiddleware.prototype, "app", void 0);
BaseAuthorityMiddleware = __decorate([
    decorator_1.Provide()
], BaseAuthorityMiddleware);
exports.BaseAuthorityMiddleware = BaseAuthorityMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXR5LmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9taWRkbGV3YXJlL2F1dGhvcml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkQ7QUFFM0QsNEJBQTRCO0FBQzVCLDRDQUF3RDtBQUN4RCxvQ0FBb0M7QUFFcEM7O0dBRUc7QUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQVloQyxPQUFPO1FBQ0gsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQW9CLEVBQUUsRUFBRTtZQUNoRCxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDckIsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNsQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDMUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzNCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUM3QixJQUFJO29CQUNBLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVEO2dCQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUU7Z0JBQ2hCLGVBQWU7Z0JBQ2YsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFFBQVEsV0FBVyxDQUFDLENBQUMsSUFB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