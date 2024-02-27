import { BaseEntity } from '@cool-midway/core';
import { AppletsPostEntity } from './post';
import { AppletsReplayEntity } from './reply';
import { AppletsCollectEntity } from './collect';
import { AppletsHistoryEntity } from './history';
import { AppletsAutographEntity } from './autograph';
/**
 * 小程序用户
 */
export declare class AppletsUserEntity extends BaseEntity {
    username: string;
    password: string;
    nickName: string;
    openId: string;
    avatarUrl: string;
    gender: number;
    city: string;
    province: string;
    country: string;
    unionId: string;
    location: string;
    role: number;
    phone: string;
    email: string;
    postCount: number;
    posts: AppletsPostEntity[];
    replyCount: number;
    replys: AppletsReplayEntity[];
    collectCount: number;
    collects: AppletsCollectEntity[];
    historyCount: number;
    historys: AppletsHistoryEntity[];
    accessToken: string;
    socketId: string;
    remark: string;
    autographs: AppletsAutographEntity[];
}
