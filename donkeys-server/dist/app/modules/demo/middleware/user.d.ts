import { IWebMiddleware, IMidwayWebNext, IMidwayWebApplication } from '@midwayjs/web';
import { Context } from 'egg';
/**
 * 描述
 */
export declare class DemoUserMiddleware implements IWebMiddleware {
    app: IMidwayWebApplication;
    resolve(): (ctx: Context, next: IMidwayWebNext) => Promise<void>;
}
