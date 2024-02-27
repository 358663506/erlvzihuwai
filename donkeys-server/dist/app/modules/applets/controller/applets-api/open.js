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
        return this.ok(info);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9hcHBsZXRzLWFwaS9vcGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFrQjtBQUNsQixtREFBbUY7QUFDbkYsMkNBQStEO0FBQy9ELGlDQUFpQztBQUNqQyw0Q0FBbUU7QUFDbkUsK0NBQTBEO0FBQzFELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsb0RBQThEO0FBQzlELHFEQUFnRTtBQUNoRSxnREFBOEQ7QUFDOUQsK0RBQTBFO0FBQzFFLHVEQUFrRTtBQUNsRSw2Q0FBd0Q7QUFDeEQsNENBQXNEO0FBQ3RELDJDQUFxRDtBQUNyRCwrQ0FBMEQ7QUFDMUQsbURBQThEO0FBQzlELGlEQUE0RDtBQUM1RDs7R0FFRztBQUlILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFpQ3JEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxZQUFZO1FBQ3JCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsaUJBQWlCLENBQVksUUFBYSxFQUFFO1FBQzlDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVILEtBQUssQ0FBQyxhQUFhLENBQVks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