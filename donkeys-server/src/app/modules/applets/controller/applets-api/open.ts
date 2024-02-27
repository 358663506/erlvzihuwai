/* 不需要登录 无需权限校验 */
import { Provide, Body, ALL, Inject, Post, Get, Query } from '@midwayjs/decorator';
import { WeLoginByCodeDTO, WeLoginDTO } from '../../dto/login';
// import { Context } from 'egg';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsLoginService } from '../../service/login';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { AppletsCarouselEntity } from '../../entity/carousel';
import { AppletsCarouselService } from '../../service/carousel';
import { AppletsCarouselController } from '../admin/carousel';
import { AppletsPhotoWallTypeService } from '../../service/photoWallType';
import { AppletsPhotoWallService } from '../../service/photoWall';
import { AppletsPostService } from '../../service/post';
import { AppletsPostEntity } from '../../entity/post';
import { PageReplyByPostDTO } from '../../dto/reply';
import { AppletsReplyService } from '../../service/reply';
import { AppletsHistoryService } from '../../service/history';
import { AppletsSearchService } from '../../service/search';
/**
 * 不需要登录的后台接口
 */

@Provide()
@CoolController()
export class AppletsOpenController extends BaseController {
    @Inject()
    appletsCarouselService: AppletsCarouselService;

    @Inject()
    appletsLoginService: AppletsLoginService;

    @Inject()
    appletsCarouselController: AppletsCarouselController;

    @InjectEntityModel(AppletsCarouselEntity)
    appletsCarouselEntity: Repository<AppletsCarouselEntity>;

    @Inject()
    appletsPhotoWallTypeService: AppletsPhotoWallTypeService;

    @Inject()
    appletsPhotoWallService: AppletsPhotoWallService;

    @Inject()
    appletspostService: AppletsPostService;

    @InjectEntityModel(AppletsPostEntity)
    appletsPostEntity: Repository<AppletsPostEntity>;

    @Inject()
    appletsReplyService: AppletsReplyService;

    @Inject()
    appletsHistoryService: AppletsHistoryService;

    @Inject()
    appletsSearchService: AppletsSearchService;
    /**
     * 轮播图
     * @returns
     */
    @Get('/carousel/list', { summary: '轮播图' })
    public async carouselList() {
        let list = await this.appletsCarouselEntity.find({ status: 1 });
        return this.ok(list);
    }

    /**
     * 照片墙组别列表
     */
    @Post('/photoWallType/page', { summary: '照片墙组' })
    async photoWallTypeList(@Body(ALL) query: any = {}) {
        query.status = 1;
        return this.ok(await this.appletsPhotoWallTypeService.page(query));
    }

    /**
     * 根据组别查询
     * 媒体列表
     * @param photoWallTypeId
     */
    @Post('/photoWall/page', { summary: '组别下的照片/视频' })
    async photoWallList(@Body(ALL) query: any = {}) {
        return this.ok(await this.appletsPhotoWallService.page(query));
    }

    /**
     * 搜索
     * @returns
     */
    @Post('/post_photo/search', { summary: '搜索' })
    public async postSearch(@Body(ALL) query: any = {}) {
        return this.ok(await this.appletsSearchService.page(query));
    }

    /**
     * 小程序登录
     * @param photoWallTypeId
     */
    @Post('/login', { summary: '登录接口' })
    async login(@Body(ALL) login: WeLoginDTO) {
        return this.ok(await this.appletsLoginService.login(login));
    }

    /**
     * 文章列表
     * @returns
     */
    @Post('/post/page', { summary: '文章列表' })
    public async postPage(@Body(ALL) query: any = {}) {
        return this.ok(await this.appletspostService.page(query));
    }

    /**
     * 获取文章详情
     * @returns
     */
    @Post('/post/info', { summary: '文章详情' })
    public async postInfo(@Body() id: number) {
        const info = await this.appletspostService.info(id);
        info.visitCount += 1;
        this.appletsPostEntity.save(info);
        this.appletsHistoryService.save({
            photoWallType: undefined,
            post: info
        });
        // isReply 1 允许评论；非 1 不允许评论
        return this.ok({ ...info, isReply: 0 });
    }

    /**
     * 获取评论
     * @returns
     */
    @Post('/reply/page', { summary: '评论分页查询' })
    public async replyPage(@Body(ALL) query: PageReplyByPostDTO) {
        return this.ok(await this.appletsReplyService.page(query));
    }

    /**
     * 刷新token
     */
    @Get('/refreshToken', { summary: '刷新token' })
    async refreshToken(@Query() refreshToken: string) {
        return this.ok(await this.appletsLoginService.refreshToken(refreshToken));
    }

    /**
     * 登录
     */
    @Post('/loginBefore', { summary: 'code 登录' })
    async loginBefore(@Body(ALL) data: WeLoginByCodeDTO) {
        return this.ok(await this.appletsLoginService.loginBefore(data));
    }
}
