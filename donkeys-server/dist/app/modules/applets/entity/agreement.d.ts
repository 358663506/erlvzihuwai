import { BaseEntity } from '@cool-midway/core';
import { AppletsAutographEntity } from './autograph';
/**
 * 回复
 */
export declare class AppletsAgreementEntity extends BaseEntity {
    title: string;
    content: string;
    qrcode: string;
    autographs: AppletsAutographEntity[];
    autographCount: number;
    autographUserCount: number;
    status: number;
}
