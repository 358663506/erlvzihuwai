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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppletsHistoryService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const label_1 = require("../entity/label");
// import { HistoryDTO, DelHistoryDTO } from '../dto/collect';
const post_1 = require("../entity/post");
const user_1 = require("../entity/user");
const history_1 = require("../entity/history");
const photoWallType_1 = require("../entity/photoWallType");
/* 足迹 */
let AppletsHistoryService = class AppletsHistoryService extends core_1.BaseService {
    /**
     * 足迹（添加及更新）
     * @param param
     */
    async save(param) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            return;
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        if (!userInfo)
            return '';
        // 添加
        let historyInfo = await this.appletsHistoryEntity
            .createQueryBuilder('c')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (param.post) {
                qb.where('c.postId = :postId', { postId: param.post.id });
            }
            else if (param.photoWallType) {
                qb.where('c.photoWallTypeId = :photoWallTypeId', { photoWallTypeId: param.photoWallType.id });
            }
            else {
                qb.where('0 = 1');
            }
        }))
            .getOne();
        if (!historyInfo) {
            historyInfo = new history_1.AppletsHistoryEntity();
            historyInfo.user = userInfo;
            historyInfo.post = param.post;
            historyInfo.photoWallType = param.photoWallType;
        }
        else {
            historyInfo.count += 1;
        }
        await this.appletsHistoryEntity.save(historyInfo);
        return '';
    }
    /**
     * 删除足迹
     * @param param
     */
    async del(param) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        // 删除
        let collectInfo = await this.appletsHistoryEntity.findOne({
            user: userInfo,
            id: param.id
        });
        if (collectInfo) {
            await this.appletsHistoryEntity.delete({ id: collectInfo.id });
        }
        return '';
    }
    /**
     * 分页查询
     * @param param
     */
    async page(query) {
        const { size = 15, page = 1, sort, type = null } = query;
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('非法操作');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        if (!userInfo)
            throw new core_1.CoolCommException('非法操作');
        // 查询用户
        let result = await this.appletsHistoryEntity
            .createQueryBuilder('c')
            .where('1 = 1')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (type == 'photoWallType') {
                qb.where('c.postId IS NULL');
            }
            else if (type == 'post') {
                qb.where('c.photoWallTypeId IS NULL');
            }
        }))
            .leftJoinAndSelect('c.post', 'post')
            .leftJoinAndSelect('c.photoWallType', 'photoWallType')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'c.updateTime': sort || 'DESC' })
            .getManyAndCount();
        return {
            list: result[0],
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
};
__decorate([
    orm_1.InjectEntityModel(history_1.AppletsHistoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsHistoryService.prototype, "appletsHistoryEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(label_1.AppletsLabelEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsHistoryService.prototype, "appletsLabelEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(post_1.AppletsPostEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsHistoryService.prototype, "appletsPostEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsHistoryService.prototype, "appletsUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(photoWallType_1.AppletsPhotoWallTypeEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsHistoryService.prototype, "appletsPhotoWallTypeEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], AppletsHistoryService.prototype, "coolCache", void 0);
AppletsHistoryService = __decorate([
    decorator_1.Provide()
], AppletsHistoryService);
exports.AppletsHistoryService = AppletsHistoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL2hpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUErRTtBQUMvRSx1Q0FBa0Q7QUFDbEQscUNBQStDO0FBQy9DLDJDQUFxRDtBQUNyRCw4REFBOEQ7QUFDOUQseUNBQW1EO0FBQ25ELHlDQUFtRDtBQUNuRCwrQ0FBeUQ7QUFFekQsMkRBQXFFO0FBQ3JFLFFBQVE7QUFFUixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGtCQUFXO0lBa0JsRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQXFCO1FBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQixPQUFPO1FBQ1AsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDekIsS0FBSztRQUNMLElBQUksV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLG9CQUFvQjthQUM1QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7YUFDdkIsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUNwRCxRQUFRLENBQ0wsSUFBSSxrQkFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNaLEVBQUUsQ0FBQyxLQUFLLENB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