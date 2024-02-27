import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService, ICoolCache } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Brackets, Repository } from 'typeorm';
// import { HistoryDTO, DelHistoryDTO } from '../dto/collect';
import { AppletsPostEntity } from '../entity/post';
import { AppletsUserEntity } from '../entity/user';
import { AppletsHistoryEntity } from '../entity/history';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { AppletsPhotoWallEntity } from '../entity/photoWall';
import { AppletsReplayEntity } from '../entity/reply';
/* 足迹 */
@Provide()
export class AppletsSearchService extends BaseService {
    @InjectEntityModel(AppletsHistoryEntity)
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;

    @InjectEntityModel(AppletsPhotoWallTypeEntity)
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;

    @InjectEntityModel(AppletsPostEntity)
    appletsPostEntity: Repository<AppletsPostEntity>;

    @InjectEntityModel(AppletsUserEntity)
    appletsUserEntity: Repository<AppletsUserEntity>;

    @Inject('cool:cache')
    coolCache: ICoolCache;

    @InjectEntityModel(AppletsPhotoWallEntity)
    appletsPhotoWallEntity: Repository<AppletsPhotoWallEntity>;

    @InjectEntityModel(AppletsReplayEntity)
    appletsReplayEntity: Repository<AppletsReplayEntity>;

    /**
     * 分页查询
     * @param param
     */
    async page(query) {
        const { title, type, sort = 'DESC' } = query;
        const tableUn = this.appletsPostEntity
            .createQueryBuilder('post')
            .select([
                'SUBSTR(MD5(RAND()),floor(RAND()*26)+1,6) as __id',
                'id as postId',
                "'' as photoWallTypeId",
                'title',
                'articleCover',
                'createTime',
                'updateTime',
                'visitCount',
                'departureTime',
                'status',
                'destinationPos',
                "'post' as type"
            ])
            .where('status != 0')
            .andWhere(
                new Brackets((qb) => {
                    if (type == 'photoWallType') {
                        qb.where('1 = 0');
                    }
                })
            )
            .getQuery();
        const tableTg = this.appletsPhotoWallTypeEntity
            .createQueryBuilder('photo')
            .select([
                'SUBSTR(MD5(RAND()),floor(RAND()*26)+1,6) as __id',
                "'' as postId",
                'id as photoWallTypeId',
                'name',
                'img',
                'createTime',
                'updateTime',
                'visitCount',
                'departureTime',
                'status',
                "'' as destinationPos",
                "'photoWallType' as type"
            ])
            .where('status = 1')
            .andWhere(
                new Brackets((qb) => {
                    if (type == 'post') {
                        qb.where('1 = 0');
                    }
                })
            )
            .getQuery();
        const sql = `
        SELECT
            a.photoWallTypeId,
            a.__id,
            a.postId,
            a.title,
            a.articleCover,
            a.createTime,
            a.updateTime,
            a.visitCount,
            a.departureTime,
            a.status,
            a.destinationPos,
            a.type
        FROM 
            ((${tableUn}) UNION (${tableTg})) as a
        WHERE 1 = 1
           ${this.setSql(title, 'and a.title LIKE ?', [`%${title}%`])}
        ORDER BY departureTime ${sort}
        `;
        let result = await this.sqlRenderPage(sql, query, true);
        for (let i = 0; i < result.list.length; i++) {
            const it = result.list[i];
            if (it.photoWallTypeId) {
                it.photoWallCount = await this.appletsPhotoWallEntity.createQueryBuilder('a').where('classifyId = :classifyId', { classifyId: it.photoWallTypeId }).getCount();
                it.replyCount = '';
            } else if (it.postId) {
                it.photoWallCount = '';
                it.replyCount = await this.appletsReplayEntity.createQueryBuilder('a').where('postId = :postId', { postId: it.postId }).getCount();
            }
        }
        return result;
    }
}
