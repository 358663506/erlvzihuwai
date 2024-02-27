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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXR5LmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9taWRkbGV3YXJlL2F1dGhvcml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkQ7QUFFM0QsNEJBQTRCO0FBQzVCLDRDQUF3RDtBQUN4RCxvQ0FBb0M7QUFFcEM7O0dBRUc7QUFFSCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQVluQyxPQUFPO1FBQ0gsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQW9CLEVBQUUsRUFBRTtZQUNoRCxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDckIsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNsQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDMUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkMsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDO1lBQ2pDLCtCQUErQjtZQUMvQixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUM3QixJQUFJO29CQUNBLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzlEO2dCQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUU7Z0JBQ2hCLGVBQWU7Z0JBQ2YsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFFBQVEsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMvQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUNiLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO29CQUNiLFdBQVc7b0JBQ1gsb0VBQW9FO29CQUNwRSw4QkFBOEI7b0JBQzlCLGlGQUFpRjtvQkFDakYsK0JBQStCO29CQUMvQixnQkFBZ0I7b0JBQ2hCLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxRQUFRLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDL0MsTUFBTSxJQUFJLEVBQUUsQ0FBQzt3QkFDYixPQUFPO3FCQUNWO29CQUNELDhCQUE4QjtvQkFDOUIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTt3QkFDdkIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7d0JBQ2pCLEdBQUcsQ0FBQyxJQUFJLEdBQUc7NEJBQ1AsSUFBSSxFQUFFLGNBQU8sQ0FBQyxRQUFROzRCQUN0QixPQUFPLEVBQUUsT0FBTzt5QkFDbkIsQ0FBQzt3QkFDRixPQUFPO3FCQUNWO29CQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDVCxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzt3QkFDakIsR0FBRyxDQUFDLElBQUksR0FBRzs0QkFDUCxJQUFJLEVBQUUsY0FBTyxDQUFDLFFBQVE7NEJBQ3RCLE9BQU8sRUFBRSxhQUFhO3lCQUN6QixDQUFDO3dCQUNGLE9BQU87cUJBQ1Y7b0JBQ0QsSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUN6QyxVQUFVLEdBQUcsR0FBRyxDQUFDO3FCQUNwQjtpQkFDSjtxQkFBTTtvQkFDSCxVQUFVLEdBQUcsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLFVBQVUsR0FBRyxHQUFHLEVBQUU7b0JBQ2xCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO29CQUN4QixHQUFHLENBQUMsSUFBSSxHQUFHO3dCQUNQLElBQUksRUFBRSxjQUFPLENBQUMsUUFBUTt3QkFDdEIsT0FBTyxFQUFFLGFBQWE7cUJBQ3pCLENBQUM7b0JBQ0YsT0FBTztpQkFDVjthQUNKO1lBQ0QsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQTNFRztJQURDLGtCQUFNLENBQUMsTUFBTSxDQUFDOzs4REFDUTtBQUd2QjtJQURDLGtCQUFNLENBQUMsYUFBYSxDQUFDOzs2REFDQTtBQUt0QjtJQURDLGVBQUcsRUFBRTs7dURBQ3FCO0FBVmxCLDBCQUEwQjtJQUR0QyxtQkFBTyxFQUFFO0dBQ0csMEJBQTBCLENBNkV0QztBQTdFWSxnRUFBMEIifQ==