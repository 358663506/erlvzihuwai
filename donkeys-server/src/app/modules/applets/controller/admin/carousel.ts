import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsCarouselEntity } from '../../entity/carousel';
import { AppletsCarouselService } from '../../service/carousel';

/* 轮播图 */
@Provide()
@CoolController({
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: AppletsCarouselEntity,
    service: AppletsCarouselService
})
export class AppletsCarouselController extends BaseController {
    @Inject()
    appletsCarouselService: AppletsCarouselService;
}
