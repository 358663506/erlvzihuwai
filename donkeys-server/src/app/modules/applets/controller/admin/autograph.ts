import { Inject, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsAutographEntity } from '../../entity/autograph';
import { AppletsAutographService } from '../../service/autograph';

/* 活动发布 */
@Provide()
@CoolController({
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: AppletsAutographEntity,
    service: AppletsAutographService
})
export class AppletsAutographController extends BaseController {
    @Inject()
    appletsAutographService: AppletsAutographService;
}
