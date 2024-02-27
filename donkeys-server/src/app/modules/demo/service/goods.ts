import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, Cache, CoolTransaction } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, QueryRunner, getConnection } from 'typeorm';
import { DemoGoodsEntity } from '../entity/goods';
import { ICoolCache } from '@cool-midway/core';

/**
 * 商品
 */
@Provide()
export class DemoGoodsService extends BaseService {
    @InjectEntityModel(DemoGoodsEntity)
    demoAppGoodsEntity: Repository<DemoGoodsEntity>;

    @Inject('cool:cache')
    coolCache: ICoolCache;

    /**
     * 返回所有数据
     */
    @Cache(5)
    async all() {
        return this.demoAppGoodsEntity.find();
    }

    async stopLottery(params: any) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await this.testTransaction(params, queryRunner);
        return '';
    }

    /**
     * 事务
     * @param params
     * @param queryRunner
     */
    @CoolTransaction({ isolation: 'SERIALIZABLE' })
    async testTransaction(params: any, queryRunner?: QueryRunner) {
        // 关闭
        // 停止报名
        //计算已报名的分数
    }
}
