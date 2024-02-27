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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9jb2xsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBK0U7QUFDL0UsdUNBQWtEO0FBQ2xELHFDQUErQztBQUMvQywyQ0FBcUQ7QUFFckQsK0NBQXlEO0FBQ3pELHlDQUFtRDtBQUNuRCx5Q0FBbUQ7QUFDbkQsMkRBQXFFO0FBQ3JFLFFBQVE7QUFFUixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGtCQUFXO0lBbUJsRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQWlCO1FBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE9BQU87UUFDUCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUNmLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDekIsT0FBTztRQUNQLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNkLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDekU7YUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDOUIsYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FB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