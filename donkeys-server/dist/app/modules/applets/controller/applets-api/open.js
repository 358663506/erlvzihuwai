"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppletsOpenController = void 0;
/* 不需要登录 无需权限校验 */
const decorator_1 = require("@midwayjs/decorator");
const login_1 = require("../../dto/login");
// import { Context } from 'egg';
const core_1 = require("@cool-midway/core");
const login_2 = require("../../service/login");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const carousel_1 = require("../../entity/carousel");
const carousel_2 = require("../../service/carousel");
const carousel_3 = require("../admin/carousel");
const photoWallType_1 = require("../../service/photoWallType");
const photoWall_1 = require("../../service/photoWall");
const post_1 = require("../../service/post");
const post_2 = require("../../entity/post");
const reply_1 = require("../../dto/reply");
const reply_2 = require("../../service/reply");
const history_1 = require("../../service/history");
const search_1 = require("../../service/search");
/**
 * 不需要登录的后台接口
 */
let AppletsOpenController = class AppletsOpenController extends core_1.BaseController {
    /**
     * 轮播图
     * @returns
     */
    async carouselList() {
        let list = await this.appletsCarouselEntity.find({ status: 1 });
        return this.ok(list);
    }
    /**
     * 照片墙组别列表
     */
    async photoWallTypeList(query = {}) {
        query.status = 1;
        return this.ok(await this.appletsPhotoWallTypeService.page(query));
    }
    /**
     * 根据组别查询
     * 媒体列表
     * @param photoWallTypeId
     */
    async photoWallList(query = {}) {
        return this.ok(await this.appletsPhotoWallService.page(query));
    }
    /**
     * 搜索
     * @returns
     */
    async postSearch(query = {}) {
        return this.ok(await this.appletsSearchService.page(query));
    }
    /**
     * 小程序登录
     * @param photoWallTypeId
     */
    async login(login) {
        return this.ok(await this.appletsLoginService.login(login));
    }
    /**
     * 文章列表
     * @returns
     */
    async postPage(query = {}) {
        return this.ok(await this.appletspostService.page(query));
    }
    /**
     * 获取文章详情
     * @returns
     */
    async postInfo(id) {
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
    async replyPage(query) {
        return this.ok(await this.appletsReplyService.page(query));
    }
    /**
     * 刷新token
     */
    async refreshToken(refreshToken) {
        return this.ok(await this.appletsLoginService.refreshToken(refreshToken));
    }
    /**
     * 登录
     */
    async loginBefore(data) {
        return this.ok(await this.appletsLoginService.loginBefore(data));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", carousel_2.AppletsCarouselService)
], AppletsOpenController.prototype, "appletsCarouselService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", login_2.AppletsLoginService)
], AppletsOpenController.prototype, "appletsLoginService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", carousel_3.AppletsCarouselController)
], AppletsOpenController.prototype, "appletsCarouselController", void 0);
__decorate([
    orm_1.InjectEntityModel(carousel_1.AppletsCarouselEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsOpenController.prototype, "appletsCarouselEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", photoWallType_1.AppletsPhotoWallTypeService)
], AppletsOpenController.prototype, "appletsPhotoWallTypeService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", photoWall_1.AppletsPhotoWallService)
], AppletsOpenController.prototype, "appletsPhotoWallService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", post_1.AppletsPostService)
], AppletsOpenController.prototype, "appletspostService", void 0);
__decorate([
    orm_1.InjectEntityModel(post_2.AppletsPostEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsOpenController.prototype, "appletsPostEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", reply_2.AppletsReplyService)
], AppletsOpenController.prototype, "appletsReplyService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", history_1.AppletsHistoryService)
], AppletsOpenController.prototype, "appletsHistoryService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", search_1.AppletsSearchService)
], AppletsOpenController.prototype, "appletsSearchService", void 0);
__decorate([
    decorator_1.Get('/carousel/list', { summary: '轮播图' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "carouselList", null);
__decorate([
    decorator_1.Post('/photoWallType/page', { summary: '照片墙组' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "photoWallTypeList", null);
__decorate([
    decorator_1.Post('/photoWall/page', { summary: '组别下的照片/视频' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "photoWallList", null);
__decorate([
    decorator_1.Post('/post_photo/search', { summary: '搜索' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "postSearch", null);
__decorate([
    decorator_1.Post('/login', { summary: '登录接口' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.WeLoginDTO]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "login", null);
__decorate([
    decorator_1.Post('/post/page', { summary: '文章列表' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "postPage", null);
__decorate([
    decorator_1.Post('/post/info', { summary: '文章详情' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "postInfo", null);
__decorate([
    decorator_1.Post('/reply/page', { summary: '评论分页查询' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_1.PageReplyByPostDTO]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "replyPage", null);
__decorate([
    decorator_1.Get('/refreshToken', { summary: '刷新token' }),
    __param(0, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "refreshToken", null);
__decorate([
    decorator_1.Post('/loginBefore', { summary: 'code 登录' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.WeLoginByCodeDTO]),
    __metadata("design:returntype", Promise)
], AppletsOpenController.prototype, "loginBefore", null);
AppletsOpenController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], AppletsOpenController);
exports.AppletsOpenController = AppletsOpenController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FwcGxldHMtYXBpL29wZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWtCO0FBQ2xCLG1EQUFtRjtBQUNuRiwyQ0FBK0Q7QUFDL0QsaUNBQWlDO0FBQ2pDLDRDQUFtRTtBQUNuRSwrQ0FBMEQ7QUFDMUQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxvREFBOEQ7QUFDOUQscURBQWdFO0FBQ2hFLGdEQUE4RDtBQUM5RCwrREFBMEU7QUFDMUUsdURBQWtFO0FBQ2xFLDZDQUF3RDtBQUN4RCw0Q0FBc0Q7QUFDdEQsMkNBQXFEO0FBQ3JELCtDQUEwRDtBQUMxRCxtREFBOEQ7QUFDOUQsaURBQTREO0FBQzVEOztHQUVHO0FBSUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxxQkFBYztJQWlDckQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLFlBQVk7UUFDckIsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxpQkFBaUIsQ0FBWSxRQUFhLEVBQUU7UUFDOUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsS0FBSyxDQUFDLGFBQWEsQ0FBWSxR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