import { BaseController } from '@cool-midway/core';
import { AppletsPhotoWallService } from '../../service/photoWall';
import { PhotoWallMoveDTO } from '../../dto/photoWallMove';
export declare class AppletsPhotoWallController extends BaseController {
    appletsPhotoWallService: AppletsPhotoWallService;
    /**
     * 修改分类
     */
    move(param: PhotoWallMoveDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
