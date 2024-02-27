import { App, Config, Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext, IMidwayWebApplication } from '@midwayjs/web';
import * as _ from 'lodash';
import { CoolConfig, RESCODE } from '@cool-midway/core';
import * as jwt from 'jsonwebtoken';
import { Context } from 'egg';
/**
 * 权限校验
 */
@Provide()
export class appletsAuthorityMiddleware implements IWebMiddleware {
    @Config('cool')
    coolConfig: CoolConfig;

    @Config('module.base')
    jwtConfig: CoolConfig;

    coolCache;

    @App()
    app: IMidwayWebApplication;

    resolve() {
        return async (ctx: Context, next: IMidwayWebNext) => {
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
                } catch (err) {}
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
                            code: RESCODE.COMMFAIL,
                            message: '登录失效~'
                        };
                        return;
                    }
                    const rToken = await this.coolCache.get(`applets:token:${ctx.appUser.userId}`);
                    if (!rToken) {
                        ctx.status = 401;
                        ctx.body = {
                            code: RESCODE.COMMFAIL,
                            message: '登录失效或无权限访问~'
                        };
                        return;
                    }
                    if (rToken !== token && this.coolConfig.sso) {
                        statusCode = 401;
                    }
                } else {
                    statusCode = 401;
                }
                if (statusCode > 200) {
                    ctx.status = statusCode;
                    ctx.body = {
                        code: RESCODE.COMMFAIL,
                        message: '登录失效或无权限访问~'
                    };
                    return;
                }
            }
            await next();
        };
    }
}
