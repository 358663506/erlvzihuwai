import { BaseController } from '@cool-midway/core';
import { AppletsPostService } from '../../service/post';
import { PostStatusDTO } from '../../dto/postStatus';
export declare class AppletsPostController extends BaseController {
    appletsPostService: AppletsPostService;
    /**
     * 修改状态
     */
    order(post: PostStatusDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
