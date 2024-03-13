import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import {Column, Index} from 'typeorm';


/**
 * 活动关联地址信息
 */
@EntityModel('applets_enroll_muster_address')
export class AppletsEnrollMusterAddressEntity extends BaseEntity {

    @Index()
    @Column({ comment: '报名活动关联ID', type: 'int', nullable: true })
    enroll_id: number;

    @Column({ comment: '报名活动地址ID', type: 'int', nullable: true })
    muster_address_id: number;

    @Column({ comment: '地点名称' })
    name: string;

    @Column({ comment: '集合时间', nullable: true })
    muster_time: string;


}
