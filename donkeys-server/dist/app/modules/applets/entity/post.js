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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L3Bvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUF1RDtBQUN2RCxpQ0FBMkM7QUFDM0MsbUNBQThDO0FBQzlDLDZDQUF1RDtBQUN2RCx1Q0FBaUQ7QUFDakQsNENBQStDO0FBQy9DLHVDQUFpRDtBQUVqRDs7R0FFRztBQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsaUJBQVU7Q0ErRWhELENBQUE7QUE3RUc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztnREFDZDtBQUdkO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUM3QixJQUFJO3dEQUFDO0FBR3BCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUM1QixJQUFJO3lEQUFDO0FBR3JCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3lEQUNuQztBQUd2QjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt3REFDbkM7QUFHdEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztxREFD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