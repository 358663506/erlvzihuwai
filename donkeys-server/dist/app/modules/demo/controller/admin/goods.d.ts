import { BaseController } from '@cool-midway/core';
/**
 * 商品
 */
export declare class DemoAdminGoodsController extends BaseController {
    /**
     * 其他接口
     */
    other(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
