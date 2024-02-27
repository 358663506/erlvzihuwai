/* 轮播图 */
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 轮播图
 */
@EntityModel('applets_carousel')
export class AppletsCarouselEntity extends BaseEntity {
    @Column({ comment: '图片名称' })
    name: string;

    @Column({ comment: '跳转链接', nullable: true })
    url: string;

    @Column({ comment: '图片', unique: true })
    img: string;

    @Column({ comment: '链接类型 0:完整链接', nullable: true, default: 0 })
    urlType: number;

    @Column({ comment: '排序', type: 'tinyint', nullable: true })
    sort: number;

    @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
    status: number;

    @Column({ comment: '备注', nullable: true, type: 'text' })
    remark: string;
}
