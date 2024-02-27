import { BaseController, ICoolCache, ICoolFile } from '@cool-midway/core';
import { Context } from 'egg';
/**
 * 不需要登录的后台接口
 */
export declare class BaseAppCommController extends BaseController {
    eps: any;
    coolCache: ICoolCache;
    coolFile: ICoolFile;
    ctx: Context;
    /**
     * 实体信息与路径
     * @returns
     */
    getEps(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 文件上传
     */
    upload(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 文件上传模式，本地或者云存储
     */
    uploadMode(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
