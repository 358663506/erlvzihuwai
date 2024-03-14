/* 微信用户 */
import {Inject, Provide, Get, Post, Body, ALL} from '@midwayjs/decorator';
import {CoolController, BaseController} from '@cool-midway/core';
import {EnrollUserService} from "../../service/enrollUserService";




/* 活动成员服务*/
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
     * 活动成员分页列表
     * @returns
     */
    @Post('/page', { summary: '活动成员列表' })
    public async page(@Body(ALL) query) {

        return this.ok(await this.enrollUserService.page(query));
    }

    /**
     * 添加活动成员
     * @returns
     */
    @Post('/add', { summary: '添加活动成员' })
    public async add(@Body(ALL) data: any = {}) {

        return this.ok(await this.enrollUserService.add(data));
    }

    /**
     * 修改
     * @returns
     */
    @Post('/update', { summary: '修改活动成员' })
    public async update(@Body(ALL) data: any = {}) {

        return this.ok(await this.enrollUserService.update(data));
    }

    /**
     * 成员上下车
     */
    @Post('/post/status', { summary: '成员上下车' })
    async order(@Body() id: number) {

        return this.ok(await this.enrollUserService.status(id));
    }


    /**
     * 删除成员
     * @returns
     */
    @Post('/delete', { summary: '删除成员' })
    public async delete(@Body() id: number) {
        return this.ok(await this.enrollUserService.deleteById(id));
    }

    /**
     * 成员信息
     * @returns
     */
    @Post('/info', { summary: '成员信息' })
    public async info(@Body() id: number) {
        return this.ok(await this.enrollUserService.info(id));
    }
}
