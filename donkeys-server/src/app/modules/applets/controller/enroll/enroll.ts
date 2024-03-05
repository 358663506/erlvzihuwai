/* 微信用户 */
import {Inject, Provide, Get} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsUserService } from '../../service/user';


/* 微信用户 */
@Provide()
@CoolController()
export class EnrollController extends BaseController {
    @Inject()
    appletsUserService: AppletsUserService;


    /**
     * 轮播图
     * @returns
     */
    @Get('/list', { summary: '报名活动列表' })
    public async carouselList() {

        return this.ok("123455566OK");
    }
}
