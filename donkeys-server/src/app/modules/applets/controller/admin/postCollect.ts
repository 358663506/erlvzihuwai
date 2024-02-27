import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';

/* 文章收藏 */
@Provide()
@CoolController()
export class AppletsPostCollectController extends BaseController {}
