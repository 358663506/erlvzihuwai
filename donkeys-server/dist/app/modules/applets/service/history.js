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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9oaXN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBK0U7QUFDL0UsdUNBQWtEO0FBQ2xELHFDQUErQztBQUMvQywyQ0FBcUQ7QUFDckQsOERBQThEO0FBQzlELHlDQUFtRDtBQUNuRCx5Q0FBbUQ7QUFDbkQsK0NBQXlEO0FBRXpELDJEQUFxRTtBQUNyRSxRQUFRO0FBRVIsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxrQkFBVztJQWtCbEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFxQjtRQUM1QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckIsT0FBTztRQUNQLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLEtBQUs7UUFDTCxJQUFJLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxvQkFBb0I7YUFDNUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7YUFDcEQsUUFBUSxDQUNMLElBQUksa0JBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2hCLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDWixFQUFFLENBQUMsS0FBSyxD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