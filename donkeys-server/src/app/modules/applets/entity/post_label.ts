/* 文章 标签  */
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { ManyToOne } from 'typeorm';
import { AppletsLabelEntity } from './label';
import { AppletsPostEntity } from './post';
import { AppletsPhotoWallTypeEntity } from './photoWallType';
/**
 * 中间表 （文章、标签）
 */
@EntityModel('applets_post_label')
export class AppletsPostLablelEntity extends BaseEntity {
    // 文章
    @ManyToOne(() => AppletsPostEntity, (post) => post.labels)
    post: AppletsPostEntity;

    // 标签
    @ManyToOne(() => AppletsLabelEntity, (label) => label.labels)
    label: AppletsLabelEntity;

    // 照片墙
    @ManyToOne(() => AppletsPhotoWallTypeEntity, (photo) => photo.labels)
    photoWallType: AppletsPhotoWallTypeEntity;
}
