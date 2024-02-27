import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService, ICoolCache, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Brackets, Repository } from 'typeorm';
import { AppletsLabelEntity } from '../entity/label';
// import { HistoryDTO, DelHistoryDTO } from '../dto/collect';
import { AppletsPostEntity } from '../entity/post';
import { AppletsUserEntity } from '../entity/user';
import { AppletsHistoryEntity } from '../entity/history';
import { HistoryDTO, SaveHistoryDTO } from '../dto/history';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
/* 足迹 */
@Provide()
export class AppletsHistoryService extends BaseService {
    @InjectEntityModel(AppletsHistoryEntity)
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;

    @InjectEntityModel(AppletsLabelEntity)
    appletsLabelEntity: Repository<AppletsLabelEntity>;

    @InjectEntityModel(AppletsPostEntity)
    appletsPostEntity: Repository<AppletsPostEntity>;

    @InjectEntityModel(AppletsUserEntity)
    appletsUserEntity: Repository<AppletsUserEntity>;

    @InjectEntityModel(AppletsPhotoWallTypeEntity)
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;
    @Inject('cool:cache')
    coolCache: ICoolCache;

    /**
     * 足迹（添加及更新）
     * @param param
     */
    async save(param: SaveHistoryDTO) {
        const appUser = this.ctx.appUser;
        if (!appUser) return;
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        if (!userInfo) return '';
        // 添加
        let historyInfo = await this.appletsHistoryEntity
            .createQueryBuilder('c')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(
                new Brackets((qb) => {
                    if (param.post) {
                        qb.where('c.postId = :postId', { postId: param.post.id });
                    } else if (param.photoWallType) {
                        qb.where('c.photoWallTypeId = :photoWallTypeId', { photoWallTypeId: param.photoWallType.id });
                    } else {
                        qb.where('0 = 1');
                    }
                })
            )
            .getOne();
        if (!historyInfo) {
            historyInfo = new AppletsHistoryEntity();
            historyInfo.user = userInfo;
            historyInfo.post = param.post;
            historyInfo.photoWallType = param.photoWallType;
        } else {
            historyInfo.count += 1;
        }
        await this.appletsHistoryEntity.save(historyInfo);
        return '';
    }
    /**
     * 删除足迹
     * @param param
     */
    async del(param: HistoryDTO) {
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        // 删除
        let collectInfo = await this.appletsHistoryEntity.findOne({
            user: userInfo,
            id: param.id
        });
        if (collectInfo) {
            await this.appletsHistoryEntity.delete({ id: collectInfo.id });
        }
        return '';
    }
    /**
     * 分页查询
     * @param param
     */
    async page(query) {
        const { size = 15, page = 1, sort, type = null } = query;
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('非法操作');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        if (!userInfo) throw new CoolCommException('非法操作');
        // 查询用户
        let result = await this.appletsHistoryEntity
            .createQueryBuilder('c')
            .where('1 = 1')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(
                new Brackets((qb) => {
                    if (type == 'photoWallType') {
                        qb.where('c.postId IS NULL');
                    } else if (type == 'post') {
                        qb.where('c.photoWallTypeId IS NULL');
                    }
                })
            )
            .leftJoinAndSelect('c.post', 'post')
            .leftJoinAndSelect('c.photoWallType', 'photoWallType')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'c.updateTime': sort || 'DESC' })
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
}
