import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne } from 'typeorm';
import { AppletsPhotoWallTypeEntity } from './photoWallType';

/**
 * 图片文件信息
 */
@EntityModel('applets_photo_wall')
export class AppletsPhotoWallEntity extends BaseEntity {
    @Column({ comment: '图片地址' })
    url: string;

    @Column({ comment: '类型', nullable: true })
    type: string;

    // @Column({ comment: '分类ID', nullable: true })
    @ManyToOne(() => AppletsPhotoWallTypeEntity, (type) => type.photoWalls)
    classify: AppletsPhotoWallTypeEntity;
}
