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
exports.AppletsPostEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const reply_1 = require("./reply");
const post_label_1 = require("./post_label");
const collect_1 = require("./collect");
const core_1 = require("@cool-midway/core");
const history_1 = require("./history");
/**
 * 回复
 */
let AppletsPostEntity = class AppletsPostEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '文章标题' }),
    __metadata("design:type", String)
], AppletsPostEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ comment: '出发时间', nullable: true }),
    __metadata("design:type", Date)
], AppletsPostEntity.prototype, "departureTime", void 0);
__decorate([
    typeorm_1.Column({ comment: '集合时间', nullable: true }),
    __metadata("design:type", Date)
], AppletsPostEntity.prototype, "collectionTime", void 0);
__decorate([
    typeorm_1.Column({ comment: '出行目的地', default: '', nullable: true }),
    __metadata("design:type", String)
], AppletsPostEntity.prototype, "destinationPos", void 0);
__decorate([
    typeorm_1.Column({ comment: '集合地点', default: '', nullable: true }),
    __metadata("design:type", String)
], AppletsPostEntity.prototype, "collectionPos", void 0);
__decorate([
    typeorm_1.Column({ comment: '活动难度: 1-5星', default: 1, type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "difficulty", void 0);
__decorate([
    typeorm_1.Column({ comment: '风景级别: 1-5星', default: 1, type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "lanscapeLevel", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态: 0隐藏 1:报名中 2:结束报名 3:活动开始 4:活动取消 5:活动结束', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '预收款', default: 0, nullable: true }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "advance_payments", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章封面', default: '', nullable: true }),
    __metadata("design:type", String)
], AppletsPostEntity.prototype, "articleCover", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章描述', default: '', nullable: true }),
    __metadata("design:type", String)
], AppletsPostEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章内容', type: 'text' }),
    __metadata("design:type", String)
], AppletsPostEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.AppletsUserEntity, (appletsUserEntity) => appletsUserEntity.posts),
    __metadata("design:type", user_1.AppletsUserEntity)
], AppletsPostEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ comment: '置顶1:置顶，0不置顶', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "top", void 0);
__decorate([
    typeorm_1.Column({ comment: '锁', default: 0, nullable: true }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "lock", void 0);
__decorate([
    typeorm_1.OneToMany(() => reply_1.AppletsReplayEntity, (reply) => reply.post),
    __metadata("design:type", Array)
], AppletsPostEntity.prototype, "replys", void 0);
__decorate([
    typeorm_1.Column({ comment: '访问量', default: 0 }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "visitCount", void 0);
__decorate([
    typeorm_1.OneToMany(() => history_1.AppletsHistoryEntity, (history) => history.post),
    __metadata("design:type", Array)
], AppletsPostEntity.prototype, "historys", void 0);
__decorate([
    typeorm_1.OneToMany(() => post_label_1.AppletsPostLablelEntity, (post_label) => post_label.post),
    __metadata("design:type", Array)
], AppletsPostEntity.prototype, "labels", void 0);
__decorate([
    typeorm_1.OneToMany(() => collect_1.AppletsCollectEntity, (collect) => collect.post),
    __metadata("design:type", Array)
], AppletsPostEntity.prototype, "collects", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章类型:quill|mp', default: '' }),
    __metadata("design:type", String)
], AppletsPostEntity.prototype, "contentType", void 0);
__decorate([
    typeorm_1.Column({ comment: '可以回复:1 不可以回复0', default: 0 }),
    __metadata("design:type", Number)
], AppletsPostEntity.prototype, "canReply", void 0);
AppletsPostEntity = __decorate([
    orm_1.EntityModel('applets_post')
], AppletsPostEntity);
exports.AppletsPostEntity = AppletsPostEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvcG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMscUNBQXVEO0FBQ3ZELGlDQUEyQztBQUMzQyxtQ0FBOEM7QUFDOUMsNkNBQXVEO0FBQ3ZELHVDQUFpRDtBQUNqRCw0Q0FBK0M7QUFDL0MsdUNBQWlEO0FBR2pEOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxpQkFBVTtDQWlGaEQsQ0FBQTtBQS9FRztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O2dEQUNkO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQzdCLElBQUk7d0RBQUM7QUFHcEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQzVCLElBQUk7eURBQUM7QUFHckI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7eURBQ25DO0FBR3ZCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dEQUNuQztBQUd0QjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3FEQUM1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