import { AppletsUserEntity } from './user';
import { BaseEntity } from '@cool-midway/core';
import { AppletsAgreementEntity } from './agreement';
/**
 * 回复
 */
export declare class AppletsAutographEntity extends BaseEntity {
    agreement: AppletsAgreementEntity;
    user: AppletsUserEntity;
    content: string;
    userName: string;
}
