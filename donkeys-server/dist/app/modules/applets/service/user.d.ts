import { BaseService, ICoolCache } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsUserEntity } from '../entity/user';
import { UserRoleDTO } from '../dto/userRole';
export declare class AppletsUserService extends BaseService {
    appletsUserEntity: Repository<AppletsUserEntity>;
    coolCache: ICoolCache;
    /**
     * 修改权限
     * @param query
     */
    role(userParams: UserRoleDTO): Promise<void>;
    /**
     * 用户信息
     * @param query
     */
    info(id: any): Promise<AppletsUserEntity>;
    infoByApp(): Promise<AppletsUserEntity>;
}
