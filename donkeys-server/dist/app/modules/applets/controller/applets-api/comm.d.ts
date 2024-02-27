import { BaseController, ICoolFile } from '@cool-midway/core';
import { AppletsLoginService } from '../../service/login';
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
export declare class AppletsCommController extends BaseController {
    appletsCarouselService: AppletsCarouselService;
    appletsLoginService: AppletsLoginService;
    appletsCarouselController: AppletsCarouselController;
    appletsCarouselEntity: Repository<AppletsCarouselEntity>;
    appletsReplyService: AppletsReplyService;
    appletsPostService: AppletsPostService;
    appletsCollectService: AppletsCollectService;
    appletsUserService: AppletsUserService;
    appletsUserEntity: Repository<AppletsUserEntity>;
    appletsHistoryService: AppletsHistoryService;
    appletsSearchService: AppletsSearchService;
    appletsPhotoWallTypeService: AppletsPhotoWallTypeService;
    appletsAgreementService: AppletsAgreementService;
    appletsAutographService: AppletsAutographService;
    ctx: Context;
    coolFile: ICoolFile;
    /**
     * 添加文章
     * @returns
     */
    postadd(data?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 修改文章
     * @returns
     */
    postUpdate(data?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 修改文章状态
     */
    order(post: PostStatusDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 置顶状态
     */
    top(post: PostTopDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 添加评论
     * @returns
     */
    addReply(data: AddReplyDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 删除评论
     * @returns
     */
    replyDel(id: string): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 删除文章
     * @returns
     */
    postDel(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 删除照片墙
     * @returns
     */
    photoWallTypeDel(id: string): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 新增照片墙
     * @returns
     */
    photoWallTypeAdd(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 用户信息
     * @returns
     */
    replyPage(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 查询收藏
     * @returns
     */
    infoCollect(data: CollectDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 收藏
     * @returns
     */
    addCollect(data: CollectDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 取消收藏
     * @returns
     */
    delCollect(data: DelCollectDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 我的收藏
     * @returns
     */
    pageCollect(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 我的足迹
     * @returns
     */
    pageHistory(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 删除足迹
     * @returns
     */
    delHistory(query: HistoryDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 文件上传
     */
    upload(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    private isAdmin;
    agreementInfo(data: AgreementInfoDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    addAutograph(data: AutographAddDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    autographInfo(data: AutographByAgreeDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    autographUpdate(data: AutographUpdateDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
