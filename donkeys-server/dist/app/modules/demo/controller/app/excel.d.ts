import { BaseController } from '@cool-midway/core';
import { Context } from 'egg';
/**
 * 导入导出
 */
export declare class DemoExcelController extends BaseController {
    ctx: Context;
    /**
     * 导入
     */
    import(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 导出
     */
    export(): Promise<void>;
}
