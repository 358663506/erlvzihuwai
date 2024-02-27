import { AppletsUserEntity } from './user';
import { AppletsReplayEntity } from './reply';
import { AppletsPostLablelEntity } from './post_label';
import { AppletsCollectEntity } from './collect';
import { BaseEntity } from '@cool-midway/core';
import { AppletsHistoryEntity } from './history';
/**
 * 回复
 */
export declare class AppletsPostEntity extends BaseEntity {
    title: string;
    departureTime: Date;
    collectionTime: Date;
    destinationPos: string;
    collectionPos: string;
    difficulty: number;
    lanscapeLevel: number;
    status: number;
    advance_payments: number;
    articleCover: string;
    description: string;
    content: string;
    user: AppletsUserEntity;
    top: number;
    lock: number;
    replyCount: number;
    replys: AppletsReplayEntity[];
    visitCount: number;
    historys: AppletsHistoryEntity[];
    labels: AppletsPostLablelEntity[];
    labelNames: string[];
    collectCount: number;
    collects: AppletsCollectEntity[];
    contentType: string;
    canReply: number;
}
