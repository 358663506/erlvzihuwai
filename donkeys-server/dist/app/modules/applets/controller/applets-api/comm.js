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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9hcHBsZXRzLWFwaS9jb21tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUF1RTtBQUN2RSxpQ0FBaUM7QUFDakMsNENBQWlHO0FBQ2pHLCtDQUEwRDtBQUMxRCx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLG9EQUE4RDtBQUM5RCxxREFBZ0U7QUFDaEUsZ0RBQThEO0FBQzlELCtEQUEwRTtBQUMxRSw2Q0FBd0Q7QUFDeEQsK0NBQTBEO0FBQzFELCtDQUE4RDtBQUM5RCxtREFBOEQ7QUFDOUQsMkNBQThDO0FBQzlDLDRDQUFzRDtBQUN0RCw2Q0FBd0Q7QUFDeEQscURBQWlFO0FBRWpFLG1EQUE4RDtBQUM5RCwrQ0FBK0M7QUFDL0MsaURBQTREO0FBQzVELHVEQUFrRTtBQUNsRSx1REFBa0U7QUFDbEUsbURBQXVEO0FBQ3ZELG1EQUErRjtBQUMvRjs7R0FFRztBQUlILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFnRHJEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQVksT0FBWSxFQUFFO1FBQzFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLFVBQVUsQ0FBWSxPQUFZLEVBQUU7UUFDN0MsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1B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