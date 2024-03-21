/* 微信用户 */
import {Inject, Provide, Get, Post, Body, ALL, Query} from '@midwayjs/decorator';
import {CoolController, BaseController, CoolCommException} from '@cool-midway/core';
import {EnrollUserService} from "../../service/enrollUserService";
import {InjectEntityModel} from "@midwayjs/orm";
import {AppletsPostEntity} from "../../entity/post";
import {Repository} from "typeorm";
import {AppletsEnrollMusterAddressEntity} from "../../entity/enroll_muster_address";




/* 活动成员服务*/
@Provide()
@CoolController("/enrollUser")
export class EnrollUserController extends BaseController {
    @Inject()
    enrollUserService: EnrollUserService;
    @InjectEntityModel(AppletsPostEntity)
    appletsPostEntity: Repository<AppletsPostEntity>;

    @InjectEntityModel(AppletsEnrollMusterAddressEntity)
    appletsEnrollMusterAddressEntity:Repository<AppletsEnrollMusterAddressEntity>
    /**
     * 活动成员列表
     * @returns
     */
    @Get('/list', { summary: '活动成员列表' })
    public async carouselList() {

        const  id = 51;
        if (!id) {
            throw new CoolCommException('非法操作~');
        }

        let info = await this.appletsPostEntity
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.user', 'user')
            .loadRelationCountAndMap('p.replyCount', 'p.replys')
            .loadRelationCountAndMap('p.collectCount', 'p.collects')
            .where('p.id = :id', { id })
            .getOne();

        info.addressList = await  this.appletsEnrollMusterAddressEntity.createQueryBuilder("p").where("p.enroll_id=:id",{id}).getMany();

        console.log(info);

        if (!info) {
            throw new CoolCommException('文章不存在');
        }
        return this.ok(info);
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

    /**
     * 根据活动获取成员信息
     * @returns
     */
    @Get('/getByEnrollId', { summary: '根据活动获取成员信息' })
    public async getByEnrollId(@Query('openId') openId:string,@Query('enrollId')enrollId: number) {

        return this.ok(await this.enrollUserService.getByEnrollId(openId,enrollId));
    }

    /**
     * 获取已填的身份证信息
     * @returns
     */
    @Get('/getIdCardByOpenId', { summary: '获取已填的身份证信息' })
    public async getIdCardByOpenId(@Query() openId:string) {

        return this.ok(await this.enrollUserService.getIdCardByOpenId(openId));
    }
}
