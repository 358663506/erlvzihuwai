import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import { AppletsPostLablelEntity } from './post_label';
import { AppletsCollectEntity } from './collect';
import { AppletsPhotoWallEntity } from './photoWall';
import { BaseEntity } from '@cool-midway/core';
import { AppletsHistoryEntity } from './history';
/**
 * 图片信息分类
 */
@EntityModel('applets_photo_wall_type')
export class AppletsPhotoWallTypeEntity extends BaseEntity {
    @Column({ comment: '类别名称' })
    name: string;

    @Column({ comment: '父分类ID', type: 'tinyint', nullable: true })
    parentId: number;

    @Column({ comment: '排序', type: 'tinyint', nullable: true })
    sort: number;

    @Column({ comment: '活动时间', nullable: true })
    departureTime: Date;

    @Column({ comment: '封面', nullable: true })
    img: string;

    // 收藏
    @OneToMany(() => AppletsCollectEntity, (collect) => collect.photoWallType)
    collects: AppletsCollectEntity[];

    // 影像
    @OneToMany(() => AppletsPhotoWallEntity, (photo) => photo.classify)
    photoWalls: AppletsPhotoWallEntity[];
    // 影像数量
    photoWallCount: number;

    // 足迹
    @OneToMany(() => AppletsHistoryEntity, (history) => history.photoWallType)
    historys: AppletsHistoryEntity[];

    // 标签 id
    @OneToMany(() => AppletsPostLablelEntity, (post_label) => post_label.post)
    labels: AppletsPostLablelEntity[];

    @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
    status: number;

    @Column({ comment: '备注', nullable: true, type: 'text' })
    remark: string;

    @Column({ comment: '访问量', default: 0 })
    visitCount: number;
}
