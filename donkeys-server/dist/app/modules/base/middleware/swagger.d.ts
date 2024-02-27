import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
/**
 * swagger
 */
export declare class BaseSwaggerMiddleware implements IWebMiddleware {
    resolve(): (ctx: Context, next: IMidwayWebNext) => Promise<void>;
}
