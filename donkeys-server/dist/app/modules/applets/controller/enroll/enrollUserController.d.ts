import { BaseController } from '@cool-midway/core';
import { EnrollUserService } from "../../service/enrollUserService";
export declare class EnrollUserController extends BaseController {
    enrollUserService: EnrollUserService;
    /**
     * 活动成员列表
     * @returns
     */
    carouselList(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 活动成员分页列表
     * @returns
     */
    page(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 添加活动成员
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
     * 成员上下车
     */
    order(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 删除成员
     * @returns
     */
    delete(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 成员信息
     * @returns
     */
    info(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 根据活动获取成员信息
     * @returns
     */
    getByEnrollId(openId: string, enrollId: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 获取已填的身份证信息
     * @returns
     */
    getIdCardByOpenId(openId: string): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
