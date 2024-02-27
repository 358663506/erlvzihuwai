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
exports.AppletsPostService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const post_1 = require("../entity/post");
const label_1 = require("../entity/label");
const R = require("ramda");
const history_1 = require("../entity/history");
const collect_1 = require("../entity/collect");
const reply_1 = require("../entity/reply");
/* 发布活动 */
let AppletsPostService = class AppletsPostService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = null, title, status } = query;
        // 后台 admin 默认查全部
        const { userId } = this.ctx.admin || { userId: undefined };
        let result = await this.appletsPostEntity
            .createQueryBuilder('a')
            .select(['a.id', 'a.title', 'a.top', 'a.status', 'a.articleCover', 'a.visitCount', 'a.updateTime', 'a.createTime', 'a.destinationPos', 'a.departureTime'])
            .addSelect(userId ? ['a.content'] : [])
            .where('1 = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (!R.isNil(status)) {
                if (status != -1) {
                    // 小程序用户传 -1 可以查询全部
                    qb.where('a.status = :status', { status: status });
                }
            }
            else if (!userId) {
                // 小程序用户默认不能查询全部
                qb.where('a.status != 0');
            }
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (title) {
                qb.where('a.title LIKE :title', { title: `%${title}%` });
            }
        }))
            .loadRelationCountAndMap('a.replyCount', 'a.replys')
            .loadRelationCountAndMap('a.collectCount', 'a.collects')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy(sort ? { 'a.createTime': sort } : { 'a.top': 'DESC', 'a.status': 'ASC', 'a.createTime': 'DESC' })
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
    /**
     * 新增
     * @param param
     */
    async add(param) {
        await this.appletsPostEntity.save(param);
        // 判断有没有标签
        // await this.updateUserRole(param);
        return param;
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        let postInfo = await this.appletsPostEntity.findOne({ id: param.id });
        if (!postInfo) {
            throw new core_1.CoolCommException('文章不存在');
        }
        param.visitCount = postInfo.visitCount;
        await this.appletsPostEntity.save(param);
        // 判断有没有标签
        // await this.updateUserRole(param);
        return param;
    }
    /**
     * 根据ID获得信息
     * @param id
     */
    async info(id) {
        if (!id) {
            throw new core_1.CoolCommException('非法操作~');
        }
        let info = await this.appletsPostEntity
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.user', 'user')
            .loadRelationCountAndMap('p.replyCount', 'p.replys')
            .loadRelationCountAndMap('p.collectCount', 'p.collects')
            .where('p.id = :id', { id })
            .getOne();
        if (!info) {
            throw new core_1.CoolCommException('文章不存在');
        }
        return info;
    }
    /**
     * 修改状态
     * @param post
     */
    async status(post) {
        const postInfo = await this.appletsPostEntity.findOne({ id: post.id });
        if (!postInfo) {
            throw new core_1.CoolCommException('文章不存在');
        }
        postInfo.status = post.status;
        await this.appletsPostEntity.save(postInfo);
    }
    /**
     * 修改置顶状态
     * @param post
     */
    async top(post) {
        const postInfo = await this.appletsPostEntity.findOne({ id: post.id });
        if (!postInfo) {
            throw new core_1.CoolCommException('文章不存在');
        }
        postInfo.top = post.top;
        await this.appletsPostEntity.save(postInfo);
    }
    /**
     * 删除文章
     * @param id
     */
    async deleteById(id) {
        let postInfo = await this.appletsPostEntity.findOne({ id: id });
        if (postInfo) {
            await this.appletsReplayEntity.delete({ post: postInfo });
            await this.appletsHistoryEntity.delete({ post: postInfo });
            await this.appletsCollectEntity.delete({ post: postInfo });
            await this.appletsPostEntity.delete({ id });
        }
        return '';
    }
};
__decorate([
    orm_1.InjectEntityModel(post_1.AppletsPostEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPostService.prototype, "appletsPostEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(label_1.AppletsLabelEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPostService.prototype, "appletsLabelEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(history_1.AppletsHistoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPostService.prototype, "appletsHistoryEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(collect_1.AppletsCollectEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPostService.prototype, "appletsCollectEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(reply_1.AppletsReplayEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPostService.prototype, "appletsReplayEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], AppletsPostService.prototype, "coolCache", void 0);
AppletsPostService = __decorate([
    decorator_1.Provide()
], AppletsPostService);
exports.AppletsPostService = AppletsPostService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBK0U7QUFDL0UsdUNBQWtEO0FBQ2xELHFDQUErQztBQUMvQyx5Q0FBbUQ7QUFDbkQsMkNBQXFEO0FBRXJELDJCQUEyQjtBQUMzQiwrQ0FBeUQ7QUFDekQsK0NBQXlEO0FBQ3pELDJDQUFzRDtBQUV0RCxVQUFVO0FBRVYsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxrQkFBVztJQW1CL0M7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ1osTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDbEUsaUJBQWlCO1FBQ2pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQztRQUMzRCxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUI7YUFDcEMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3pKLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUN0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