import { BaseEntity } from '@cool-midway/core';
import { AppletsLabelEntity } from './label';
import { AppletsPostEntity } from './post';
import { AppletsPhotoWallTypeEntity } from './photoWallType';
/**
 * 中间表 （文章、标签）
 */
export declare class AppletsPostLablelEntity extends BaseEntity {
    post: AppletsPostEntity;
    label: AppletsLabelEntity;
    photoWallType: AppletsPhotoWallTypeEntity;
}
