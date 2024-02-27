import { WeLoginByCodeDTO, WeLoginDTO } from '../../dto/login';
import { BaseController } from '@cool-midway/core';
import { AppletsLoginService } from '../../service/login';
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
export declare class AppletsOpenController extends BaseController {
    appletsCarouselService: AppletsCarouselService;
    appletsLoginService: AppletsLoginService;
    appletsCarouselController: AppletsCarouselController;
    appletsCarouselEntity: Repository<AppletsCarouselEntity>;
    appletsPhotoWallTypeService: AppletsPhotoWallTypeService;
    appletsPhotoWallService: AppletsPhotoWallService;
    appletspostService: AppletsPostService;
    appletsPostEntity: Repository<AppletsPostEntity>;
    appletsReplyService: AppletsReplyService;
    appletsHistoryService: AppletsHistoryService;
    appletsSearchService: AppletsSearchService;
    /**
     * 轮播图
     * @returns
     */
    carouselList(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 照片墙组别列表
     */
    photoWallTypeList(query?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 根据组别查询
     * 媒体列表
     * @param photoWallTypeId
     */
    photoWallList(query?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 搜索
     * @returns
     */
    postSearch(query?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 小程序登录
     * @param photoWallTypeId
     */
    login(login: WeLoginDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 文章列表
     * @returns
     */
    postPage(query?: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 获取文章详情
     * @returns
     */
    postInfo(id: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 获取评论
     * @returns
     */
    replyPage(query: PageReplyByPostDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 刷新token
     */
    refreshToken(refreshToken: string): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 登录
     */
    loginBefore(data: WeLoginByCodeDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
