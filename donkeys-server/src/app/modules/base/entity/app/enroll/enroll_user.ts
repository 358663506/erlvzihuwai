import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('base_sys_user')
export class EnrollUserEntity extends BaseEntity {
    @Index()
    @Column({ comment: '报名活动关联ID', type: 'int', nullable: true })
    enroll_id: number;

    @Column({ comment: '微信名称', nullable: true })
    name: string;

    @Index({ unique: true })
    @Column({ comment: '手机', length: 100 })
    mobile: string;

    @Column({ comment: '集合地点ID', type: 'int', nullable: true })
    enroll_muster_address_id: number;

    @Column({ comment: '是否自驾0否，1是', default: 1, type: 'tinyint' })
    driver_flg: number;


    @Column({ comment: '自驾出发地址', nullable: true })
    driver_address: string;


    @Column({ comment: '真实姓名', nullable: true })
    real_name: string;

    @Column({ comment: '身份证号', nullable: true, length: 20 })
    Id_card: string;

    @Column({ comment: '保险单号', nullable: true })
    policy_no: string;

    @Column({ comment: '保险照片', nullable: true })
    policy_img: string;

    @Column({ comment: '是否愿意吃晚餐0，吃，1:不吃，2都可以', default: 1, type: 'tinyint' })
    dinner_lfg: number;


    @Column({ comment: 'socketId', nullable: true })
    emergency_contact: string;

    @Column({ comment: 'socketId', nullable: true })
    emergency_contact_mobile: string;

    @Column({ comment: 'socketId', nullable: true })
    openid: string;

    @Column({ comment: 'socketId', nullable: true })
    unionid: string;

    @Column({ comment: '0:参加，1:退出', default: 1, type: 'tinyint' })
    status: number;

    @Column({ comment: '性别'})
    sex: string;
}
