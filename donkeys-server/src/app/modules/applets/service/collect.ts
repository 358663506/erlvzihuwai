import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService, ICoolCache, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Brackets, Repository } from 'typeorm';
import { AppletsLabelEntity } from '../entity/label';
import { CollectDTO, DelCollectDTO } from '../dto/collect';
import { AppletsCollectEntity } from '../entity/collect';
import { AppletsPostEntity } from '../entity/post';
import { AppletsUserEntity } from '../entity/user';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
/* 收藏 */
@Provide()
export class AppletsCollectService extends BaseService {
    @InjectEntityModel(AppletsCollectEntity)
    appletsCollectEntity: Repository<AppletsCollectEntity>;

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
     * 收藏
     * @param param
     */
    async add(param: CollectDTO) {
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let postInfo = null,
            photoWallInfo = null;
        // 查询文章
        if (param.postId) {
            postInfo = await this.appletsPostEntity.findOne({ id: param.postId });
        } else if (param.photoWallTypeId) {
            photoWallInfo = await this.appletsPhotoWallTypeEntity.findOne({
                id: param.photoWallTypeId
            });
        }
        if (!postInfo && !photoWallInfo) {
            throw new CoolCommException('参数错误');
        }
        // 添加
        let collectInfo = await this.appletsCollectEntity
            .createQueryBuilder('c')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(
                new Brackets((qb) => {
                    if (postInfo) {
                        qb.where('c.postId = :postId', { postId: postInfo.id });
                    } else if (photoWallInfo) {
                        qb.where('c.photoWallTypeId = :photoWallTypeId', { photoWallTypeId: photoWallInfo.id });
                    } else {
                        qb.where('0 = 1');
                    }
                })
            )
            .getOne();
        if (!collectInfo) {
            collectInfo = new AppletsCollectEntity();
            collectInfo.user = userInfo;
            collectInfo.post = postInfo;
            collectInfo.photoWallType = photoWallInfo;
        }
        await this.appletsCollectEntity.save(collectInfo);
        return collectInfo;
    }

    /**
     * 取消收藏
     * @param param
     */
    async del(param: DelCollectDTO) {
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let collectInfo = await this.appletsCollectEntity.findOne({
            user: userInfo,
            id: param.id
        });
        if (collectInfo) {
            await this.appletsCollectEntity.delete({ id: collectInfo.id });
        }
        return '';
    }

    /**
     * 我的查询
     * @param param
     */
    async info(param: CollectDTO) {
        const appUser = this.ctx.appUser;
        if (!appUser) return '';
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let info = await this.appletsCollectEntity
            .createQueryBuilder('c')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(
                new Brackets((qb) => {
                    if (param.postId) {
                        qb.where('c.postId = :postId', { postId: param.postId });
                    } else if (param.photoWallTypeId) {
                        qb.where('c.photoWallTypeId = :photoWallTypeId', { photoWallTypeId: param.photoWallTypeId });
                    } else {
                        qb.where('0 = 1');
                    }
                })
            )
            .getOne();
        return info;
    }

    /**
     * 分页查询我的收藏
     * @param param
     */
    async page(query) {
        const { size = 15, page = 1, sort, type = null } = query;
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let result = await this.appletsCollectEntity
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
            .orderBy({ 'c.createTime': sort || 'DESC' })
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
