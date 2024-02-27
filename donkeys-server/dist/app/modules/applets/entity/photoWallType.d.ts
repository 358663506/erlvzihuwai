import { AppletsPostLablelEntity } from './post_label';
import { AppletsCollectEntity } from './collect';
import { AppletsPhotoWallEntity } from './photoWall';
import { BaseEntity } from '@cool-midway/core';
import { AppletsHistoryEntity } from './history';
/**
 * 图片信息分类
 */
export declare class AppletsPhotoWallTypeEntity extends BaseEntity {
    name: string;
    parentId: number;
    sort: number;
    departureTime: Date;
    img: string;
    collects: AppletsCollectEntity[];
    photoWalls: AppletsPhotoWallEntity[];
    photoWallCount: number;
    historys: AppletsHistoryEntity[];
    labels: AppletsPostLablelEntity[];
    status: number;
    remark: string;
    visitCount: number;
}
