import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { AppletsPostEntity } from '../entity/post';
/**
 * 足迹参数校验
 */
export declare class SaveHistoryDTO {
    post: AppletsPostEntity | undefined;
    photoWallType: AppletsPhotoWallTypeEntity | undefined;
}
export declare class HistoryDTO {
    id: number;
}
