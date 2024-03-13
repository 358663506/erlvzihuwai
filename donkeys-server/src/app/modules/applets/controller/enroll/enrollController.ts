/* 微信用户 */
import {Inject, Provide, Get, Post, Body, ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import {EnrollService} from "../../service/enrollService";


/* 微信用户 */
@Provide()
@CoolController("/enroll")
export class EnrollController extends BaseController {
    @Inject()
    enrollService: EnrollService;


    /**
     * 活动列表
     * @returns
     */
    @Get('/list', { summary: '报名活动列表' })
    public async carouselList() {

        return this.ok("123455566OK");
    }


    /**
     * 轮播图
     * @returns
     */
    @Post('/add', { summary: '报名活动列表' })
    public async add(@Body(ALL) data: any = {}) {

        return this.ok(await this.enrollService.add(data));
    }
}
