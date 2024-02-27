import { BaseEntity } from '@cool-midway/core';
import { AppletsUserEntity } from './user';
import { AppletsPostEntity } from './post';
import { AppletsPhotoWallTypeEntity } from './photoWallType';
/**
 * 足迹
 */
export declare class AppletsHistoryEntity extends BaseEntity {
    post: AppletsPostEntity;
    photoWallType: AppletsPhotoWallTypeEntity;
    user: AppletsUserEntity;
    count: number;
}
