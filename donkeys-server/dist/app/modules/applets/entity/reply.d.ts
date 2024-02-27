import { AppletsUserEntity } from './user';
import { AppletsPostEntity } from './post';
import { BaseEntity } from '@cool-midway/core';
/**
 * 回复
 */
export declare class AppletsReplayEntity extends BaseEntity {
    content: string;
    post: AppletsPostEntity;
    user: AppletsUserEntity;
    reply: AppletsReplayEntity;
    replys: AppletsReplayEntity;
    status: number;
}
