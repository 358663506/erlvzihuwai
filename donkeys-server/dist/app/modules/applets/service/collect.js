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
exports.AppletsCollectService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const label_1 = require("../entity/label");
const collect_1 = require("../entity/collect");
const post_1 = require("../entity/post");
const user_1 = require("../entity/user");
const photoWallType_1 = require("../entity/photoWallType");
/* 收藏 */
let AppletsCollectService = class AppletsCollectService extends core_1.BaseService {
    /**
     * 收藏
     * @param param
     */
    async add(param) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let postInfo = null, photoWallInfo = null;
        // 查询文章
        if (param.postId) {
            postInfo = await this.appletsPostEntity.findOne({ id: param.postId });
        }
        else if (param.photoWallTypeId) {
            photoWallInfo = await this.appletsPhotoWallTypeEntity.findOne({
                id: param.photoWallTypeId
            });
        }
        if (!postInfo && !photoWallInfo) {
            throw new core_1.CoolCommException('参数错误');
        }
        // 添加
        let collectInfo = await this.appletsCollectEntity
            .createQueryBuilder('c')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (postInfo) {
                qb.where('c.postId = :postId', { postId: postInfo.id });
            }
            else if (photoWallInfo) {
                qb.where('c.photoWallTypeId = :photoWallTypeId', { photoWallTypeId: photoWallInfo.id });
            }
            else {
                qb.where('0 = 1');
            }
        }))
            .getOne();
        if (!collectInfo) {
            collectInfo = new collect_1.AppletsCollectEntity();
            collectInfo.user = userInfo;
            collectInfo.post = postInfo;
            collectInfo.photoWallType = photoWallInfo;
        }
        await this.appletsCollectEntity.save(collectInfo);
        return collectInfo;
    }
    /**
     * 取消收藏
     * @param param
     */
    async del(param) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let collectInfo = await this.appletsCollectEntity.findOne({
            user: userInfo,
            id: param.id
        });
        if (collectInfo) {
            await this.appletsCollectEntity.delete({ id: collectInfo.id });
        }
        return '';
    }
    /**
     * 我的查询
     * @param param
     */
    async info(param) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            return '';
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let info = await this.appletsCollectEntity
            .createQueryBuilder('c')
            .where('c.userId = :userId', { userId: userInfo.id })
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (param.postId) {
                qb.where('c.postId = :postId', { postId: param.postId });
            }
            else if (param.photoWallTypeId) {
                qb.where('c.photoWallTypeId = :photoWallTypeId', { photoWallTypeId: param.photoWallTypeId });
            }
            else {
                qb.where('0 = 1');
            }
        }))
            .getOne();
        return info;
    }
    /**
     * 分页查询我的收藏
     * @param param
     */
    async page(query) {
        const { size = 15, page = 1, sort, type = null } = query;
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ openId: appUser.openId });
        let result = await this.appletsCollectEntity
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
            .orderBy({ 'c.createTime': sort || 'DESC' })
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
    orm_1.InjectEntityModel(collect_1.AppletsCollectEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsCollectService.prototype, "appletsCollectEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(label_1.AppletsLabelEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsCollectService.prototype, "appletsLabelEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(post_1.AppletsPostEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsCollectService.prototype, "appletsPostEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsCollectService.prototype, "appletsUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(photoWallType_1.AppletsPhotoWallTypeEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsCollectService.prototype, "appletsPhotoWallTypeEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], AppletsCollectService.prototype, "coolCache", void 0);
AppletsCollectService = __decorate([
    decorator_1.Provide()
], AppletsCollectService);
exports.AppletsCollectService = AppletsCollectService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL2NvbGxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUErRTtBQUMvRSx1Q0FBa0Q7QUFDbEQscUNBQStDO0FBQy9DLDJDQUFxRDtBQUVyRCwrQ0FBeUQ7QUFDekQseUNBQW1EO0FBQ25ELHlDQUFtRDtBQUNuRCwyREFBcUU7QUFDckUsUUFBUTtBQUVSLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsa0JBQVc7SUFtQmxEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBaUI7UUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU87WUFBRSxNQUFNLElBQUksd0JBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsT0FBTztRQUNQLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsRixJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQ2YsYUFBYSxHQUFHLElBQUksQ0FBQztRQUN6QixPQUFPO1FBQ1AsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2QsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN6RTthQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUM5QixhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFD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