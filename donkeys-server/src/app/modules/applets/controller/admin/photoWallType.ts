import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsPhotoWallTypeEntity } from '../../entity/photoWallType';
import { AppletsPhotoWallTypeService } from '../../service/photoWallType';

/* 照片墙分类 */
@Provide()
@CoolController({
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: AppletsPhotoWallTypeEntity,
    service: AppletsPhotoWallTypeService
})
export class AppletsPhotoWallTypeController extends BaseController {
    @Inject()
    appletsPhotoWallTypeService: AppletsPhotoWallTypeService;
}
