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
const muster_address_1 = require("../entity/muster_address");
const enroll_muster_address_1 = require("../entity/enroll_muster_address");
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
        const savedParam = await this.appletsPostEntity.save(param);
        // 判断有没有标签
        // await this.updateUserRole(param);
        if (param.addressList) {
            // 使用forEach方法遍历数组
            for (const addressId of param.addressList) {
                console.log("====================>" + addressId);
                const addressInfo = await this.appletsMusterAddressEntity.findOne({ id: addressId });
                console.log("=========addressInfo===========>" + addressInfo);
                if (addressInfo) {
                    const enrollMusterAddressEntity = new enroll_muster_address_1.AppletsEnrollMusterAddressEntity();
                    enrollMusterAddressEntity.enroll_id = savedParam.id;
                    enrollMusterAddressEntity.muster_address_id = addressId;
                    enrollMusterAddressEntity.muster_time = addressInfo.muster_time;
                    enrollMusterAddressEntity.name = addressInfo.name;
                    console.log("====================>" + savedParam.id);
                    console.log("====================>" + addressInfo.muster_time);
                    await this.appletsEnrollMusterAddressEntity.save(enrollMusterAddressEntity);
                }
            }
        }
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
        // 修改的时候先删除
        await this.appletsEnrollMusterAddressEntity.delete({ enroll_id: param.id });
        if (param.addressList) {
            // 使用forEach方法遍历数组
            for (const addressId of param.addressList) {
                console.log("====================>" + addressId);
                const addressInfo = await this.appletsMusterAddressEntity.findOne({ id: addressId });
                console.log("=========addressInfo===========>" + addressInfo);
                if (addressInfo) {
                    const enrollMusterAddressEntity = new enroll_muster_address_1.AppletsEnrollMusterAddressEntity();
                    enrollMusterAddressEntity.enroll_id = param.id;
                    enrollMusterAddressEntity.muster_address_id = addressId;
                    enrollMusterAddressEntity.muster_time = addressInfo.muster_time;
                    enrollMusterAddressEntity.name = addressInfo.name;
                    await this.appletsEnrollMusterAddressEntity.save(enrollMusterAddressEntity);
                }
            }
        }
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
__decorate([
    orm_1.InjectEntityModel(muster_address_1.AppletsMusterAddressEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPostService.prototype, "appletsMusterAddressEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(enroll_muster_address_1.AppletsEnrollMusterAddressEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPostService.prototype, "appletsEnrollMusterAddressEntity", void 0);
AppletsPostService = __decorate([
    decorator_1.Provide()
], AppletsPostService);
exports.AppletsPostService = AppletsPostService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL3Bvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUErRTtBQUMvRSx1Q0FBa0Q7QUFDbEQscUNBQStDO0FBQy9DLHlDQUFtRDtBQUNuRCwyQ0FBcUQ7QUFFckQsMkJBQTJCO0FBQzNCLCtDQUF5RDtBQUN6RCwrQ0FBeUQ7QUFDekQsMkNBQXNEO0FBQ3RELDZEQUFvRTtBQUNwRSwyRUFBaUY7QUFFakYsVUFBVTtBQUVWLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsa0JBQVc7SUF5Qi9DOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNaLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2xFLGlCQUFpQjtRQUNqQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDM0QsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCO2FBQ3BDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQzthQUN2QixNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzthQUN6SixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFD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