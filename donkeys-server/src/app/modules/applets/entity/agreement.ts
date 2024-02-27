import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@cool-midway/core';
import { AppletsAutographEntity } from './autograph';
/**
 * 回复
 */
@EntityModel('applets_agreement')
export class AppletsAgreementEntity extends BaseEntity {
    @Column({ comment: '协议标题' })
    title: string;

    // 协议内容
    @Column({ comment: '文章内容', type: 'text' })
    content: string;

    @Column({ comment: '二维码', nullable: true, default: '' })
    qrcode: string;

    // 协议签名
    @OneToMany(() => AppletsAutographEntity, (autograph) => autograph.agreement)
    autographs: AppletsAutographEntity[];

    // 签名总数
    autographCount: number;

    // 签名用户数
    autographUserCount: number;

    @Column({ comment: '状态: 0:隐藏协议 1:开放签名 2:禁用签名', default: 1, type: 'tinyint' })
    status: number;
}
