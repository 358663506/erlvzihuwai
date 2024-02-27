import { Inject, Provide, Post, Body, ALL } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsPostEntity } from '../../entity/post';
import { AppletsPostService } from '../../service/post';
import { PostStatusDTO } from '../../dto/postStatus';

/* 活动发布 */
@Provide()
@CoolController({
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: AppletsPostEntity,
    service: AppletsPostService
})
export class AppletsPostController extends BaseController {
    @Inject()
    appletsPostService: AppletsPostService;

    /**
     * 修改状态
     */
    @Post('/status', { summary: '修改角色' })
    async order(@Body(ALL) post: PostStatusDTO) {
        return this.ok(await this.appletsPostService.status(post));
    }
}
