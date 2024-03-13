import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import {Column} from 'typeorm';


/**
 * 图片文件信息
 */
@EntityModel('applets_enroll_muster_address')
export class AppletsMusterAddressEntity extends BaseEntity {


    @Column({ comment: '是否有效0:有效，1无效', type: 'int', nullable: true })
    state: number;

    @Column({ comment: '地点名称' })
    name: string;

    @Column({ comment: '集合时间', nullable: true })
    muster_time: string;


}