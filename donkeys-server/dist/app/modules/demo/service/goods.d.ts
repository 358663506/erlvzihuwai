import { BaseService } from '@cool-midway/core';
import { Repository, QueryRunner } from 'typeorm';
import { DemoGoodsEntity } from '../entity/goods';
import { ICoolCache } from '@cool-midway/core';
/**
 * 商品
 */
export declare class DemoGoodsService extends BaseService {
    demoAppGoodsEntity: Repository<DemoGoodsEntity>;
    coolCache: ICoolCache;
    /**
     * 返回所有数据
     */
    all(): Promise<DemoGoodsEntity[]>;
    stopLottery(params: any): Promise<string>;
    /**
     * 事务
     * @param params
     * @param queryRunner
     */
    testTransaction(params: any, queryRunner?: QueryRunner): Promise<void>;
}
