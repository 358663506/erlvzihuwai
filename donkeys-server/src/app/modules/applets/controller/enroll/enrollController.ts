/* 微信用户 */
import {Inject, Provide, Get, Post, Body, ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import {EnrollService} from "../../service/enrollService";


/* 活动服务 */
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
     * 活动成员列表
     * @returns
     */
    @Post('/page', { summary: '活动成员列表' })
    public async page(@Body(ALL) query) {

        return this.ok(await this.enrollService.page(query));
    }


    /**
     * 添加活动
     * @returns
     */
    @Post('/add', { summary: '添加活动' })
    public async add(@Body(ALL) data: any = {}) {

        return this.ok(await this.enrollService.add(data));
    }

    /**
     * 修改
     * @returns
     */
    @Post('/update', { summary: '修改' })
    public async update(@Body(ALL) data: any = {}) {

        return this.ok(await this.enrollService.update(data));
    }

    /**
     * 成员上下车
     */
    @Post('/status', { summary: '活动上下线' })
    async order(@Body() id: number) {

        return this.ok(await this.enrollService.status(id));
    }

    /**
     * 活动信息
     * @returns
     */
    @Post('/info', { summary: '用户信息' })
    public async info(@Body() id: number) {
        return this.ok(await this.enrollService.info(id));
    }
}
