import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('applets_enroll')
export class EnrollEntity extends BaseEntity {
    @Index()
    @Column({ comment: '活动名称', nullable: true })
    name: string;

    @Column({ comment: '活动介绍' })
    introduce: string;

    @Column({ comment: '是否有效0:有效，1无效' })
    status: number;

    @Column({ comment: '报名开关0可，1否', nullable: true })
    registration_flg: number;

    @Column({ comment: '修改开关0可，1否', nullable: true })
    update_flg: number;

    @Column({ comment: '最大报名人数', nullable: true})
    most_count: number;

    @Column({ comment: '活动图片' })
    img: string;

}