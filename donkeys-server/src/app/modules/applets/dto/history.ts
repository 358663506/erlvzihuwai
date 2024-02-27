import { Rule, RuleType } from '@midwayjs/decorator';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { AppletsPostEntity } from '../entity/post';
/**
 * 足迹参数校验
 */
export class SaveHistoryDTO {
    post: AppletsPostEntity | undefined;
    // 照片墙 id
    photoWallType: AppletsPhotoWallTypeEntity | undefined;
}

export class HistoryDTO {
    // 足迹 id
    @Rule(RuleType.number())
    id: number;
}
