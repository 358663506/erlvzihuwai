import { BaseService } from '@cool-midway/core';
import { EnrollUserEntity } from '../entity/enrollUser';
import { Repository } from "typeorm";
export declare class EnrollUserService extends BaseService {
    enrollUserEntity: Repository<EnrollUserEntity>;
    /**
     * 根据活动查询成员
     * @param param
     */
    page(query: any): Promise<{
        list: EnrollUserEntity[];
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
    /**
     * 新增
     * @param param
     */
    add(param: any): Promise<any>;
    /**
     * 修改
     * @param param 数据
     */
    update(param: any): Promise<any>;
    deleteById(id: number): Promise<string>;
    /**
     * 根据ID获得信息
     * @param id
     */
    info(id: any): Promise<EnrollUserEntity>;
    /**
     * 修改状态
     * @param post
     */
    status(id: number): Promise<void>;
    /**
     * 根据活动获取成员信息
     * @param enrollId
     * @param openId
     */
    getByEnrollId(openId: string, enrollId: number): Promise<EnrollUserEntity>;
    /**
     * 获取已填的身份证信息
     * @param enrollId
     * @param openId
     */
    getIdCardByOpenId(openId: string): Promise<EnrollUserEntity>;
}
