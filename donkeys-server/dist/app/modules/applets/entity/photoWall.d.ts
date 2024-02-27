import { BaseEntity } from '@cool-midway/core';
import { AppletsPhotoWallTypeEntity } from './photoWallType';
/**
 * 图片文件信息
 */
export declare class AppletsPhotoWallEntity extends BaseEntity {
    url: string;
    type: string;
    classify: AppletsPhotoWallTypeEntity;
}
