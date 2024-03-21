import { BaseController } from '@cool-midway/core';
import { MusterAddressService } from "../../service/musterAddressService";
export declare class MusterAddressController extends BaseController {
    musterAddressService: MusterAddressService;
    /**
     * 报名活动列表
     * @returns
     */
    page(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 添加活动
     * @returns
     */
    add(data?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 修改
     * @returns
     */
    update(data?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 集合地址状态修改
     */
    order(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 地址详情
     * @returns
     */
    info(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 删除
     * @returns
     */
    delete(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
