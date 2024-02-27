/* 收藏  */
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { ManyToOne } from 'typeorm';
import { AppletsUserEntity } from './user';
import { AppletsPostEntity } from './post';
import { AppletsPhotoWallTypeEntity } from './photoWallType';
/**
 * 收藏
 */
@EntityModel('applets_collect')
export class AppletsCollectEntity extends BaseEntity {
    // 文章
    @ManyToOne(() => AppletsPostEntity, (post) => post.collects)
    post: AppletsPostEntity;

    // 照片墙分类
    @ManyToOne(() => AppletsPhotoWallTypeEntity, (type) => type.collects)
    photoWallType: AppletsPhotoWallTypeEntity;

    // 用户
    @ManyToOne(() => AppletsUserEntity, (user) => user.collects)
    user: AppletsUserEntity;
}
