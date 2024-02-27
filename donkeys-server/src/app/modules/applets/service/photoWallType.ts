import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { Brackets, Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import R = require('ramda');
import { AppletsHistoryEntity } from '../entity/history';
import { AppletsCollectEntity } from '../entity/collect';

/* 照片墙 */
@Provide()
export class AppletsPhotoWallTypeService extends BaseService {
    @InjectEntityModel(AppletsPhotoWallTypeEntity)
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;

    @InjectEntityModel(AppletsHistoryEntity)
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;

    @InjectEntityModel(AppletsCollectEntity)
    appletsCollectEntity: Repository<AppletsCollectEntity>;
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort, status = 1 } = query;
        // 后台 admin 默认查全部
        const { userId } = this.ctx.admin || { userId: undefined };
        let result = await this.appletsPhotoWallTypeEntity
            .createQueryBuilder('a')
            .select(['a.id', 'a.createTime', 'a.departureTime', 'a.status', 'a.img', 'a.name', 'a.parentId', 'a.remark', 'a.sort', 'a.updateTime', 'a.visitCount'])
            .where('1 = 1')
            .andWhere(
                new Brackets((qb) => {
                    if (R.type(status) === 'Number') {
                        if (status !== -1) {
                            if (!userId) qb.where('a.status = :status', { status: status });
                        }
                        // 后台 admin 默认查全部
                    } else {
                        qb.where('a.status = 1');
                    }
                })
            )
            .loadRelationCountAndMap('a.photoWallCount', 'a.photoWalls')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.departureTime': sort || 'DESC' })
            .getManyAndCount();
        return {
            list: result[0],

            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
    /**
     * 删除照片墙
     * @param id
     */
    async deleteById(id: number) {
        let photoWallTypeInfo = await this.appletsPhotoWallTypeEntity.findOne({ id: id });
        if (photoWallTypeInfo) {
            await this.appletsHistoryEntity.delete({
                photoWallType: photoWallTypeInfo
            });
            await this.appletsCollectEntity.delete({
                photoWallType: photoWallTypeInfo
            });
            await this.appletsPhotoWallTypeEntity.delete({ id });
        }
        return '';
    }
}
