import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsAutographEntity } from '../entity/autograph';
import { AppletsUserEntity } from '../entity/user';
import { AppletsAgreementEntity } from '../entity/agreement';
import { AutographAddDTO, AutographUpdateDTO } from '../dto/autograph';
/** 签名 */
export declare class AppletsAutographService extends BaseService {
    appletsAutographEntity: Repository<AppletsAutographEntity>;
    appletsUserEntity: Repository<AppletsUserEntity>;
    appletsAgreementEntity: Repository<AppletsAgreementEntity>;
    /** 新增签名 */
    addAutograph(param: AutographAddDTO): Promise<AppletsAutographEntity>;
    /** 查询签名 */
    getAutograph(agreementId: number): Promise<AppletsAutographEntity>;
    /** 更新签名 */
    updateAutograph(param: AutographUpdateDTO): Promise<AppletsAutographEntity>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: AppletsAutographEntity[];
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
}
