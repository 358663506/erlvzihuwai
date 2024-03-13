/* 微信用户 */
import {Inject, Provide, Get, Post, Body, ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import {EnrollUserService} from "../../service/enrollUserService";


/* 微信用户 */
@Provide()
@CoolController("/enrollUser")
export class EnrollUserController extends BaseController {
    @Inject()
    enrollUserService: EnrollUserService;


    /**
     * 活动成员列表
     * @returns
     */
    @Get('/list', { summary: '活动成员列表' })
    public async carouselList() {

        return this.ok("123455566OK");
    }


    /**
     * 添加活动成员
     * @returns
     */
    @Post('/add', { summary: '添加活动成员' })
    public async add(@Body(ALL) data: any = {}) {

        return this.ok(await this.enrollUserService.add(data));
    }
}
