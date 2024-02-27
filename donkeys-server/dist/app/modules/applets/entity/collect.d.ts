import { BaseEntity } from '@cool-midway/core';
import { AppletsUserEntity } from './user';
import { AppletsPostEntity } from './post';
import { AppletsPhotoWallTypeEntity } from './photoWallType';
/**
 * 收藏
 */
export declare class AppletsCollectEntity extends BaseEntity {
    post: AppletsPostEntity;
    photoWallType: AppletsPhotoWallTypeEntity;
    user: AppletsUserEntity;
}
