import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, getConnection, In, Brackets } from 'typeorm';
import { AppletsPhotoWallEntity } from '../entity/photoWall';
import { PhotoWallMoveDTO } from '../dto/photoWallMove';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { AppletsHistoryService } from './history';

/* 照片墙 */
@Provide()
export class AppletsPhotoWallService extends BaseService {
    @InjectEntityModel(AppletsPhotoWallEntity)
    appletsPhotoWallEntity: Repository<AppletsPhotoWallEntity>;

    @Inject()
    appletsHistoryService: AppletsHistoryService;

    @InjectEntityModel(AppletsPhotoWallTypeEntity)
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;

    /**
     * 修改分类
     */
    async move(param: PhotoWallMoveDTO) {
        let classifyInfo = await this.appletsPhotoWallTypeEntity.findOne({
            id: param.classifyId
        });
        if (!classifyInfo) {
            throw new CoolCommException('分类不存在');
        }
        await getConnection()
            .createQueryBuilder()
            .update(AppletsPhotoWallEntity)
            .set({ classify: classifyInfo })
            .where({ id: In<number>(param.ids) })
            .execute();
        return '';
    }

    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { classifyId, isVisitCount = false, size = 15, page = 1, sort } = query;
        let photoWallTypeInfo = new AppletsPhotoWallTypeEntity();
        if (classifyId && classifyId > 0) {
            photoWallTypeInfo = await this.appletsPhotoWallTypeEntity.findOne({
                id: classifyId
            });
            if (!photoWallTypeInfo) {
                throw new CoolCommException('分类不存在');
            }
            if (isVisitCount) {
                photoWallTypeInfo.visitCount += 1;
                await this.appletsPhotoWallTypeEntity.save(photoWallTypeInfo);
            }
            if (page === 1) {
                this.appletsHistoryService.save({
                    photoWallType: photoWallTypeInfo,
                    post: undefined
                });
            }
        }

        let result = await this.appletsPhotoWallEntity
            .createQueryBuilder('a')
            .where('1 = 1')
            .andWhere(
                new Brackets((qb) => {
                    if (classifyId > 0) {
                        qb.where('a.classifyId = :classifyId', { classifyId: classifyId });
                    } else if (classifyId == -1) {
                        qb.where('a.classifyId IS NULL');
                    }
                })
            )
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort || 'DESC' })
            .getManyAndCount();
        return {
            list: result[0],
            typeInfo: photoWallTypeInfo,
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
}
