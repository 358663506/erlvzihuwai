import { BaseController } from '@cool-midway/core';
import { DemoGoodsService } from '../../service/goods';
/**
 * 商品
 */
export declare class DemoAppGoodsController extends BaseController {
    demoGoodsService: DemoGoodsService;
    /**
     * 请求所有
     * @param name 名称
     * @returns
     */
    all(name: string, age: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
