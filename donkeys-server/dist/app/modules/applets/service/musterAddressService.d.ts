import { BaseService } from '@cool-midway/core';
import { Repository } from "typeorm";
import { AppletsMusterAddressEntity } from "../entity/muster_address";
export declare class MusterAddressService extends BaseService {
    appletsMusterAddressEntity: Repository<AppletsMusterAddressEntity>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: AppletsMusterAddressEntity[];
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
    info(id: any): Promise<AppletsMusterAddressEntity>;
    /**
     * 修改状态
     * @param post
     */
    status(id: number): Promise<void>;
}
