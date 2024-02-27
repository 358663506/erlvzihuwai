import { BaseService, ICoolFile } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsAgreementEntity } from '../entity/agreement';
import { ILogger } from '@midwayjs/logger';
import { AgreementStatusDTO } from '../dto/agreement';
import { Iconfig } from '../config';
export declare class AppletsAgreementService extends BaseService {
    logger: ILogger;
    coolConfig: Iconfig;
    appletsAgreementEntity: Repository<AppletsAgreementEntity>;
    coolFile: ICoolFile;
    getAgreementQRCode(id: number): Promise<string>;
    info(id: number): Promise<AppletsAgreementEntity>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: AppletsAgreementEntity[];
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
    /**
     * 修改状态
     * @param post
     */
    status(data: AgreementStatusDTO): Promise<void>;
    /**
     * 保存二维码
     * @param data
     */
    upload(data: any): Promise<string>;
}
