/* 微信用户 */
import {Inject, Provide, Post, Body, ALL} from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import {MusterAddressService} from "../../service/musterAddressService";


/* 集合地址服务 */
@Provide()
@CoolController("/musterAdress")
export class MusterAddressController extends BaseController {
    @Inject()
    musterAddressService: MusterAddressService;

    /**
     * 报名活动列表
     * @returns
     */
    @Post('/page', { summary: '集合地址列表' })
    public async page(@Body(ALL) query) {

        return this.ok(await this.musterAddressService.page(query));
    }


    /**
     * 添加活动
     * @returns
     */
    @Post('/add', { summary: '添加集合地址' })
    public async add(@Body(ALL) data: any = {}) {

        return this.ok(await this.musterAddressService.add(data));
    }

    /**
     * 修改
     * @returns
     */
    @Post('/update', { summary: '修改' })
    public async update(@Body(ALL) data: any = {}) {

        return this.ok(await this.musterAddressService.update(data));
    }

    /**
     * 集合地址状态修改
     */
    @Post('/status', { summary: '集合地址状态修改' })
    async order(@Body() id: number) {

        return this.ok(await this.musterAddressService.status(id));
    }

    /**
     * 地址详情
     * @returns
     */
    @Post('/info', { summary: '地址详情' })
    public async info(@Body() id: number) {
        return this.ok(await this.musterAddressService.info(id));
    }

    /**
     * 删除
     * @returns
     */
    @Post('/delete', { summary: '删除' })
    public async delete(@Body() id: number) {
        return this.ok(await this.musterAddressService.deleteById(id));
    }
}
