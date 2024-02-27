/* 足迹 */
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne } from 'typeorm';
import { AppletsUserEntity } from './user';
import { AppletsPostEntity } from './post';
import { AppletsPhotoWallTypeEntity } from './photoWallType';
/**
 * 足迹
 */
@EntityModel('applets_history')
export class AppletsHistoryEntity extends BaseEntity {
    // 文章
    @ManyToOne(() => AppletsPostEntity, (post) => post.historys)
    post: AppletsPostEntity;

    // 照片墙分类
    @ManyToOne(() => AppletsPhotoWallTypeEntity, (type) => type.historys)
    photoWallType: AppletsPhotoWallTypeEntity;

    // 用户
    @ManyToOne(() => AppletsUserEntity, (user) => user.historys)
    user: AppletsUserEntity;

    @Column({ comment: '浏览次数', default: 1, nullable: true })
    count: number;
}
