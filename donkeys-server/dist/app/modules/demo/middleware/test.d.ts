import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
/**
 * 描述
 */
export declare class TestMiddleware implements IWebMiddleware {
    resolve(): (ctx: Context, next: IMidwayWebNext) => Promise<void>;
}
