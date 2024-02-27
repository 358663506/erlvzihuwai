import { Provide, Body, ALL, Inject, Post } from '@midwayjs/decorator';
// import { Context } from 'egg';
import { CoolController, BaseController, CoolCommException, ICoolFile } from '@cool-midway/core';
import { AppletsLoginService } from '../../service/login';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { AppletsCarouselEntity } from '../../entity/carousel';
import { AppletsCarouselService } from '../../service/carousel';
import { AppletsCarouselController } from '../admin/carousel';
import { AppletsPhotoWallTypeService } from '../../service/photoWallType';
import { AppletsPostService } from '../../service/post';
import { AppletsReplyService } from '../../service/reply';
import { CollectDTO, DelCollectDTO } from '../../dto/collect';
import { AppletsCollectService } from '../../service/collect';
import { AddReplyDTO } from '../../dto/reply';
import { AppletsUserEntity } from '../../entity/user';
import { AppletsUserService } from '../../service/user';
import { PostStatusDTO, PostTopDTO } from '../../dto/postStatus';
import { Context } from 'egg';
import { AppletsHistoryService } from '../../service/history';
import { HistoryDTO } from '../../dto/history';
import { AppletsSearchService } from '../../service/search';
import { AppletsAgreementService } from '../../service/agreement';
import { AppletsAutographService } from '../../service/autograph';
import { AgreementInfoDTO } from '../../dto/agreement';
import { AutographAddDTO, AutographByAgreeDTO, AutographUpdateDTO } from '../../dto/autograph';
/**
 * 需要登录的接口
 */

@Provide()
@CoolController()
export class AppletsCommController extends BaseController {
    @Inject()
    appletsCarouselService: AppletsCarouselService;

    @Inject()
    appletsLoginService: AppletsLoginService;

    @Inject()
    appletsCarouselController: AppletsCarouselController;

    @InjectEntityModel(AppletsCarouselEntity)
    appletsCarouselEntity: Repository<AppletsCarouselEntity>;

    @Inject()
    appletsReplyService: AppletsReplyService;

    @Inject()
    appletsPostService: AppletsPostService;

    @Inject()
    appletsCollectService: AppletsCollectService;

    @Inject()
    appletsUserService: AppletsUserService;

    @InjectEntityModel(AppletsUserEntity)
    appletsUserEntity: Repository<AppletsUserEntity>;

    @Inject()
    appletsHistoryService: AppletsHistoryService;

    @Inject()
    appletsSearchService: AppletsSearchService;

    @Inject()
    appletsPhotoWallTypeService: AppletsPhotoWallTypeService;

    @Inject()
    appletsAgreementService: AppletsAgreementService;

    @Inject()
    appletsAutographService: AppletsAutographService;

    @Inject()
    ctx: Context;

    @Inject('cool:file')
    coolFile: ICoolFile;
    /**
     * 添加文章
     * @returns
     */
    @Post('/post/add', { summary: '添加文章' })
    public async postadd(@Body(ALL) data: any = {}) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.add(data));
    }

    /**
     * 修改文章
     * @returns
     */
    @Post('/post/update', { summary: '添加文章' })
    public async postUpdate(@Body(ALL) data: any = {}) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.update(data));
    }

    /**
     * 修改文章状态
     */
    @Post('/post/status', { summary: '修改文章状态' })
    async order(@Body(ALL) post: PostStatusDTO) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.status(post));
    }

    /**
     * 置顶状态
     */
    @Post('/post/top', { summary: '置顶' })
    async top(@Body(ALL) post: PostTopDTO) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.top(post));
    }

    /**
     * 添加评论
     * @returns
     */
    @Post('/reply/add', { summary: '添加评论' })
    public async addReply(@Body(ALL) data: AddReplyDTO) {
        return this.ok(await this.appletsReplyService.add(data));
    }

    /**
     * 删除评论
     * @returns
     */
    @Post('/reply/delete', { summary: '删除评论' })
    public async replyDel(@Body() id: string) {
        await this.isAdmin();
        return this.ok(await this.appletsReplyService.delete(id));
    }
    /**
     * 删除文章
     * @returns
     */
    @Post('/post/delete', { summary: '删除文章' })
    public async postDel(@Body() id: number) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.deleteById(id));
    }
    /**
     * 删除照片墙
     * @returns
     */
    @Post('/photoWallType/delete', { summary: '删除照片墙' })
    public async photoWallTypeDel(@Body() id: string) {
        await this.isAdmin();
        return this.ok(await this.appletsPhotoWallTypeService.delete(id));
    }

    /**
     * 新增照片墙
     * @returns
     */
    @Post('/photoWallType/add', { summary: '新增照片墙' })
    public async photoWallTypeAdd(@Body(ALL) query: any) {
        await this.isAdmin();
        return this.ok(await this.appletsPhotoWallTypeService.add(query));
    }
    /**
     * 用户信息
     * @returns
     */
    @Post('/user/info', { summary: '用户信息' })
    public async replyPage() {
        return this.ok(await this.appletsUserService.infoByApp());
    }

    /**
     * 查询收藏
     * @returns
     */
    @Post('/collect/info', { summary: '收藏' })
    public async infoCollect(@Body(ALL) data: CollectDTO) {
        return this.ok(await this.appletsCollectService.info(data));
    }
    /**
     * 收藏
     * @returns
     */
    @Post('/collect/add', { summary: '收藏' })
    public async addCollect(@Body(ALL) data: CollectDTO) {
        return this.ok(await this.appletsCollectService.add(data));
    }
    /**
     * 取消收藏
     * @returns
     */
    @Post('/collect/delete', { summary: '取消收藏' })
    public async delCollect(@Body(ALL) data: DelCollectDTO) {
        return this.ok(await this.appletsCollectService.del(data));
    }
    /**
     * 我的收藏
     * @returns
     */
    @Post('/collect/page', { summary: '我的收藏' })
    public async pageCollect(@Body(ALL) query) {
        return this.ok(await this.appletsCollectService.page(query));
    }
    /**
     * 我的足迹
     * @returns
     */
    @Post('/history/page', { summary: '我的足迹' })
    public async pageHistory(@Body(ALL) query) {
        return this.ok(await this.appletsHistoryService.page(query));
    }
    /**
     * 删除足迹
     * @returns
     */
    @Post('/history/del', { summary: '我的足迹' })
    public async delHistory(@Body(ALL) query: HistoryDTO) {
        return this.ok(await this.appletsHistoryService.del(query));
    }
    /**
     * 文件上传
     */
    @Post('/upload', { summary: '文件上传' })
    async upload() {
        return this.ok(await this.coolFile.upload(this.ctx));
    }

    // 权限判断
    private async isAdmin() {
        const appUser = this.ctx.appUser;
        if (!appUser) {
            throw new CoolCommException('非法操作');
        }
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        if (!userInfo || userInfo.role !== 0) {
            throw new CoolCommException('没有权限');
        }
        return;
    }
    // 查看协议
    @Post('/agreement/info', { summary: '获取协议' })
    public async agreementInfo(@Body(ALL) data: AgreementInfoDTO) {
        return this.ok(await this.appletsAgreementService.info(data.id));
    }

    // 添加签名
    @Post('/autograph/add', { summary: '添加签名' })
    public async addAutograph(@Body(ALL) data: AutographAddDTO) {
        return this.ok(await this.appletsAutographService.addAutograph(data));
    }

    // 查询签名
    @Post('/autograph/info', { summary: '查询签名' })
    public async autographInfo(@Body(ALL) data: AutographByAgreeDTO) {
        return this.ok(await this.appletsAutographService.getAutograph(data.agreementId));
    }

    // 更新签名
    @Post('/autograph/update', { summary: '更新签名' })
    public async autographUpdate(@Body(ALL) data: AutographUpdateDTO) {
        return this.ok(await this.appletsAutographService.updateAutograph(data));
    }
}
