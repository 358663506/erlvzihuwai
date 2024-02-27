import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { BaseSysLogService } from '../service/sys/log';
import { Context } from 'egg';
/**
 * 日志中间件
 */
export declare class BaseLogMiddleware implements IWebMiddleware {
    baseSysLogService: BaseSysLogService;
    resolve(): (ctx: Context, next: IMidwayWebNext) => Promise<void>;
}
