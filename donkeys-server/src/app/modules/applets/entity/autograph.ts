import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import { AppletsUserEntity } from './user';
import { BaseEntity } from '@cool-midway/core';
import { AppletsAgreementEntity } from './agreement';
/**
 * 回复
 */
@EntityModel('applets_autograph')
export class AppletsAutographEntity extends BaseEntity {
    // 协议
    @ManyToOne(() => AppletsAgreementEntity, (agreement) => agreement.autographs)
    agreement: AppletsAgreementEntity;

    // 谁签名的
    @ManyToOne(() => AppletsUserEntity, (user) => user.replys)
    user: AppletsUserEntity;

    // 签名内容, 两个签名用 , 分割
    @Column({ comment: '签名内容', type: 'text' })
    content: string;
    userName: string;
}
