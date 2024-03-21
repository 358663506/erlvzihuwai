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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXR5LmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9iYXNlL21pZGRsZXdhcmUvYXV0aG9yaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUEyRDtBQUUzRCw0QkFBNEI7QUFDNUIsNENBQXdEO0FBQ3hELG9DQUFvQztBQUVwQzs7R0FFRztBQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBWWhDLE9BQU87UUFDSCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBb0IsRUFBRSxFQUFFO1lBQ2hELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDM0Isd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQzdCLElBQUk7b0JBQ0EsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRTtnQkFDaEIsZUFBZTtnQkFDZixJQUFJLElBQUksTUFBTSxDQUFDLElBQUksUUFBUSxXQUFXLENBQUMsQ0FBQyxJQUFJ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