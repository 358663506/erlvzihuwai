import { Body, Inject, Post, Provide, ALL } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsPhotoWallEntity } from '../../entity/photoWall';
import { AppletsPhotoWallService } from '../../service/photoWall';
import { PhotoWallMoveDTO } from '../../dto/photoWallMove';

/* 照片墙 */
@Provide()
@CoolController({
    api: ['add', 'delete', 'update', 'info', 'page'],
    entity: AppletsPhotoWallEntity,
    service: AppletsPhotoWallService,
    pageQueryOp: {
        fieldEq: ['type', 'classifyId']
    }
})
export class AppletsPhotoWallController extends BaseController {
    @Inject()
    appletsPhotoWallService: AppletsPhotoWallService;

    /**
     * 修改分类
     */
    @Post('/move', { summary: '修改分类' })
    async move(@Body(ALL) param: PhotoWallMoveDTO) {
        return this.ok(await this.appletsPhotoWallService.move(param));
    }
}
