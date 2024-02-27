/* 标签 */
import { EntityModel } from '@midwayjs/orm';
import { OneToMany } from 'typeorm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';
import { AppletsPostLablelEntity } from './post_label';

/**
 * 标签
 */
@EntityModel('applets_label')
export class AppletsLabelEntity extends BaseEntity {
    @Column({ comment: '标签名称' })
    name: string;

    @Column({ comment: '搜索次数', default: 0 })
    count: number;

    // 文章及照片墙 id
    @OneToMany(() => AppletsPostLablelEntity, (post_label) => post_label.label)
    labels: AppletsPostLablelEntity[];
}
