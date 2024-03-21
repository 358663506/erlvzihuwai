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
exports.AppletsCommController = void 0;
const decorator_1 = require("@midwayjs/decorator");
// import { Context } from 'egg';
const core_1 = require("@cool-midway/core");
const login_1 = require("../../service/login");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const carousel_1 = require("../../entity/carousel");
const carousel_2 = require("../../service/carousel");
const carousel_3 = require("../admin/carousel");
const photoWallType_1 = require("../../service/photoWallType");
const post_1 = require("../../service/post");
const reply_1 = require("../../service/reply");
const collect_1 = require("../../dto/collect");
const collect_2 = require("../../service/collect");
const reply_2 = require("../../dto/reply");
const user_1 = require("../../entity/user");
const user_2 = require("../../service/user");
const postStatus_1 = require("../../dto/postStatus");
const history_1 = require("../../service/history");
const history_2 = require("../../dto/history");
const search_1 = require("../../service/search");
const agreement_1 = require("../../service/agreement");
const autograph_1 = require("../../service/autograph");
const agreement_2 = require("../../dto/agreement");
const autograph_2 = require("../../dto/autograph");
/**
 * 需要登录的接口
 */
let AppletsCommController = class AppletsCommController extends core_1.BaseController {
    /**
     * 添加文章
     * @returns
     */
    async postadd(data = {}) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.add(data));
    }
    /**
     * 修改文章
     * @returns
     */
    async postUpdate(data = {}) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.update(data));
    }
    /**
     * 修改文章状态
     */
    async order(post) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.status(post));
    }
    /**
     * 置顶状态
     */
    async top(post) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.top(post));
    }
    /**
     * 添加评论
     * @returns
     */
    async addReply(data) {
        return this.ok(await this.appletsReplyService.add(data));
    }
    /**
     * 删除评论
     * @returns
     */
    async replyDel(id) {
        await this.isAdmin();
        return this.ok(await this.appletsReplyService.delete(id));
    }
    /**
     * 删除文章
     * @returns
     */
    async postDel(id) {
        await this.isAdmin();
        return this.ok(await this.appletsPostService.deleteById(id));
    }
    /**
     * 删除照片墙
     * @returns
     */
    async photoWallTypeDel(id) {
        await this.isAdmin();
        return this.ok(await this.appletsPhotoWallTypeService.delete(id));
    }
    /**
     * 新增照片墙
     * @returns
     */
    async photoWallTypeAdd(query) {
        await this.isAdmin();
        return this.ok(await this.appletsPhotoWallTypeService.add(query));
    }
    /**
     * 用户信息
     * @returns
     */
    async replyPage() {
        return this.ok(await this.appletsUserService.infoByApp());
    }
    /**
     * 查询收藏
     * @returns
     */
    async infoCollect(data) {
        return this.ok(await this.appletsCollectService.info(data));
    }
    /**
     * 收藏
     * @returns
     */
    async addCollect(data) {
        return this.ok(await this.appletsCollectService.add(data));
    }
    /**
     * 取消收藏
     * @returns
     */
    async delCollect(data) {
        return this.ok(await this.appletsCollectService.del(data));
    }
    /**
     * 我的收藏
     * @returns
     */
    async pageCollect(query) {
        return this.ok(await this.appletsCollectService.page(query));
    }
    /**
     * 我的足迹
     * @returns
     */
    async pageHistory(query) {
        return this.ok(await this.appletsHistoryService.page(query));
    }
    /**
     * 删除足迹
     * @returns
     */
    async delHistory(query) {
        return this.ok(await this.appletsHistoryService.del(query));
    }
    /**
     * 文件上传
     */
    async upload() {
        return this.ok(await this.coolFile.upload(this.ctx));
    }
    // 权限判断
    async isAdmin() {
        const appUser = this.ctx.appUser;
        if (!appUser) {
            throw new core_1.CoolCommException('非法操作');
        }
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        if (!userInfo || userInfo.role !== 0) {
            throw new core_1.CoolCommException('没有权限');
        }
        return;
    }
    // 查看协议
    async agreementInfo(data) {
        return this.ok(await this.appletsAgreementService.info(data.id));
    }
    // 添加签名
    async addAutograph(data) {
        return this.ok(await this.appletsAutographService.addAutograph(data));
    }
    // 查询签名
    async autographInfo(data) {
        return this.ok(await this.appletsAutographService.getAutograph(data.agreementId));
    }
    // 更新签名
    async autographUpdate(data) {
        return this.ok(await this.appletsAutographService.updateAutograph(data));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", carousel_2.AppletsCarouselService)
], AppletsCommController.prototype, "appletsCarouselService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", login_1.AppletsLoginService)
], AppletsCommController.prototype, "appletsLoginService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", carousel_3.AppletsCarouselController)
], AppletsCommController.prototype, "appletsCarouselController", void 0);
__decorate([
    orm_1.InjectEntityModel(carousel_1.AppletsCarouselEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsCommController.prototype, "appletsCarouselEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", reply_1.AppletsReplyService)
], AppletsCommController.prototype, "appletsReplyService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", post_1.AppletsPostService)
], AppletsCommController.prototype, "appletsPostService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", collect_2.AppletsCollectService)
], AppletsCommController.prototype, "appletsCollectService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", user_2.AppletsUserService)
], AppletsCommController.prototype, "appletsUserService", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsCommController.prototype, "appletsUserEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", history_1.AppletsHistoryService)
], AppletsCommController.prototype, "appletsHistoryService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", search_1.AppletsSearchService)
], AppletsCommController.prototype, "appletsSearchService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", photoWallType_1.AppletsPhotoWallTypeService)
], AppletsCommController.prototype, "appletsPhotoWallTypeService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", agreement_1.AppletsAgreementService)
], AppletsCommController.prototype, "appletsAgreementService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", autograph_1.AppletsAutographService)
], AppletsCommController.prototype, "appletsAutographService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], AppletsCommController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Inject('cool:file'),
    __metadata("design:type", Object)
], AppletsCommController.prototype, "coolFile", void 0);
__decorate([
    decorator_1.Post('/post/add', { summary: '添加文章' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "postadd", null);
__decorate([
    decorator_1.Post('/post/update', { summary: '添加文章' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "postUpdate", null);
__decorate([
    decorator_1.Post('/post/status', { summary: '修改文章状态' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postStatus_1.PostStatusDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "order", null);
__decorate([
    decorator_1.Post('/post/top', { summary: '置顶' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postStatus_1.PostTopDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "top", null);
__decorate([
    decorator_1.Post('/reply/add', { summary: '添加评论' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_2.AddReplyDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "addReply", null);
__decorate([
    decorator_1.Post('/reply/delete', { summary: '删除评论' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "replyDel", null);
__decorate([
    decorator_1.Post('/post/delete', { summary: '删除文章' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "postDel", null);
__decorate([
    decorator_1.Post('/photoWallType/delete', { summary: '删除照片墙' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "photoWallTypeDel", null);
__decorate([
    decorator_1.Post('/photoWallType/add', { summary: '新增照片墙' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "photoWallTypeAdd", null);
__decorate([
    decorator_1.Post('/user/info', { summary: '用户信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "replyPage", null);
__decorate([
    decorator_1.Post('/collect/info', { summary: '收藏' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collect_1.CollectDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "infoCollect", null);
__decorate([
    decorator_1.Post('/collect/add', { summary: '收藏' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collect_1.CollectDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "addCollect", null);
__decorate([
    decorator_1.Post('/collect/delete', { summary: '取消收藏' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collect_1.DelCollectDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "delCollect", null);
__decorate([
    decorator_1.Post('/collect/page', { summary: '我的收藏' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "pageCollect", null);
__decorate([
    decorator_1.Post('/history/page', { summary: '我的足迹' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "pageHistory", null);
__decorate([
    decorator_1.Post('/history/del', { summary: '我的足迹' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [history_2.HistoryDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "delHistory", null);
__decorate([
    decorator_1.Post('/upload', { summary: '文件上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "upload", null);
__decorate([
    decorator_1.Post('/agreement/info', { summary: '获取协议' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agreement_2.AgreementInfoDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "agreementInfo", null);
__decorate([
    decorator_1.Post('/autograph/add', { summary: '添加签名' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autograph_2.AutographAddDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "addAutograph", null);
__decorate([
    decorator_1.Post('/autograph/info', { summary: '查询签名' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autograph_2.AutographByAgreeDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "autographInfo", null);
__decorate([
    decorator_1.Post('/autograph/update', { summary: '更新签名' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autograph_2.AutographUpdateDTO]),
    __metadata("design:returntype", Promise)
], AppletsCommController.prototype, "autographUpdate", null);
AppletsCommController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], AppletsCommController);
exports.AppletsCommController = AppletsCommController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FwcGxldHMtYXBpL2NvbW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXVFO0FBQ3ZFLGlDQUFpQztBQUNqQyw0Q0FBaUc7QUFDakcsK0NBQTBEO0FBQzFELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsb0RBQThEO0FBQzlELHFEQUFnRTtBQUNoRSxnREFBOEQ7QUFDOUQsK0RBQTBFO0FBQzFFLDZDQUF3RDtBQUN4RCwrQ0FBMEQ7QUFDMUQsK0NBQThEO0FBQzlELG1EQUE4RDtBQUM5RCwyQ0FBOEM7QUFDOUMsNENBQXNEO0FBQ3RELDZDQUF3RDtBQUN4RCxxREFBaUU7QUFFakUsbURBQThEO0FBQzlELCtDQUErQztBQUMvQyxpREFBNEQ7QUFDNUQsdURBQWtFO0FBQ2xFLHVEQUFrRTtBQUNsRSxtREFBdUQ7QUFDdkQsbURBQStGO0FBQy9GOztHQUVHO0FBSUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxxQkFBYztJQWdEckQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FBWSxPQUFZLEVBQUU7UUFDMUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7SUFFSSxLQUFLLENBQUMsVUFBVSxDQUFZLE9BQVksRUFBRTtRQUM3QyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFB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