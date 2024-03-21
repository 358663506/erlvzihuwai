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
exports.appletsAuthorityMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const _ = require("lodash");
const core_1 = require("@cool-midway/core");
const jwt = require("jsonwebtoken");
/**
 * 权限校验
 */
let appletsAuthorityMiddleware = class appletsAuthorityMiddleware {
    resolve() {
        return async (ctx, next) => {
            let statusCode = 200;
            let { url } = ctx;
            const { prefix } = this.coolConfig.router;
            url = url.replace(prefix, '');
            const token = ctx.get('Authorization');
            const adminUrl = '/applets-api/';
            // 路由地址为 applets-api 前缀的 需要权限校验
            if (_.startsWith(url, adminUrl)) {
                try {
                    ctx.appUser = jwt.verify(token, this.jwtConfig.jwt.secret);
                }
                catch (err) { }
                // 不需要登录 无需权限校验
                if (new RegExp(`^${adminUrl}?.*/open/`).test(url)) {
                    await next();
                    return;
                }
                if (ctx.appUser) {
                    // 需要动态获得缓存
                    // this.coolCache = await ctx.requestContext.getAsync('cool:cache');
                    // // '角色 0:管理员 1:会员 99:普通用户',
                    // const roleId = await this.coolCache.set(`applets:role:${ctx.appUser.userId}`);
                    // ctx.appUser.roleId = roleId;
                    // 要登录每个人都有权限的接口
                    if (new RegExp(`^${adminUrl}?.*/comm/`).test(url)) {
                        await next();
                        return;
                    }
                    // 如果传的token是refreshToken则校验失败
                    if (ctx.appUser.isRefresh) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登录失效~'
                        };
                        return;
                    }
                    const rToken = await this.coolCache.get(`applets:token:${ctx.appUser.userId}`);
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
], appletsAuthorityMiddleware.prototype, "coolConfig", void 0);
__decorate([
    decorator_1.Config('module.base'),
    __metadata("design:type", Object)
], appletsAuthorityMiddleware.prototype, "jwtConfig", void 0);
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], appletsAuthorityMiddleware.prototype, "app", void 0);
appletsAuthorityMiddleware = __decorate([
    decorator_1.Provide()
], appletsAuthorityMiddleware);
exports.appletsAuthorityMiddleware = appletsAuthorityMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXR5LmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL21pZGRsZXdhcmUvYXV0aG9yaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUEyRDtBQUUzRCw0QkFBNEI7QUFDNUIsNENBQXdEO0FBQ3hELG9DQUFvQztBQUVwQzs7R0FFRztBQUVILElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBWW5DLE9BQU87UUFDSCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBb0IsRUFBRSxFQUFFO1lBQ2hELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUM7WUFDakMsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQzdCLElBQUk7b0JBQ0EsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDOUQ7Z0JBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRTtnQkFDaEIsZUFBZTtnQkFDZixJQUFJLElBQUksTUFBTSxDQUFDLElBQUksUUFBUSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQy9DLE1BQU0sSUFBSSxFQUFFLENBQUM7b0JBQ2IsT0FBTztpQkFDVjtnQkFDRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7b0JBQ2IsV0FBVztvQkFDWCxvRUFBb0U7b0JBQ3BFLDhCQUE4QjtvQkFDOUIsaUZBQWlGO29CQUNqRiwrQkFBK0I7b0JBQy9CLGdCQUFnQjtvQkFDaEIsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFFBQVEsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMvQyxNQUFNLElBQUksRUFBRSxDQUFDO3dCQUNiLE9BQU87cUJBQ1Y7b0JBQ0QsOEJBQThCO29CQUM5QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO3dCQUN2QixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzt3QkFDakIsR0FBRyxDQUFDLElBQUksR0FBRzs0QkFDUCxJQUFJLEVBQUUsY0FBTyxDQUFDLFFBQVE7NEJBQ3RCLE9BQU8sRUFBRSxPQUFPO3lCQUNuQixDQUFDO3dCQUNGLE9BQU87cUJBQ1Y7b0JBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNULEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO3dCQUNqQixHQUFHLENBQUMsSUFBSSxHQUFHOzRCQUNQLElBQUksRUFBRSxjQUFPLENBQUMsUUFBUTs0QkFDdEIsT0FBTyxFQUFFLGFBQWE7eUJBQ3pCLENBQUM7d0JBQ0YsT0FBTztxQkFDVjtvQkFDRCxJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ3pDLFVBQVUsR0FBRyxHQUFHLENBQUM7cUJBQ3BCO2lCQUNKO3FCQUFNO29CQUNILFVBQVUsR0FBRyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRTtvQkFDbEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7b0JBQ3hCLEdBQUcsQ0FBQyxJQUFJLEdBQUc7d0JBQ1AsSUFBSSxFQUFFLGNBQU8sQ0FBQyxRQUFRO3dCQUN0QixPQUFPLEVBQUUsYUFBYTtxQkFDekIsQ0FBQztvQkFDRixPQUFPO2lCQUNWO2FBQ0o7WUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBM0VHO0lBREMsa0JBQU0sQ0FBQyxNQUFNLENBQUM7OzhEQUNRO0FBR3ZCO0lBREMsa0JBQU0sQ0FBQyxhQUFhLENBQUM7OzZEQUNBO0FBS3RCO0lBREMsZUFBRyxFQUFFOzt1REFDcUI7QUFWbEIsMEJBQTBCO0lBRHRDLG1CQUFPLEVBQUU7R0FDRywwQkFBMEIsQ0E2RXRDO0FBN0VZLGdFQUEwQiJ9