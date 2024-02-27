import { IWebMiddleware, IMidwayWebNext, IMidwayWebApplication } from '@midwayjs/web';
import { CoolConfig } from '@cool-midway/core';
import { Context } from 'egg';
/**
 * 权限校验
 */
export declare class appletsAuthorityMiddleware implements IWebMiddleware {
    coolConfig: CoolConfig;
    jwtConfig: CoolConfig;
    coolCache: any;
    app: IMidwayWebApplication;
    resolve(): (ctx: Context, next: IMidwayWebNext) => Promise<void>;
}
