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
exports.AppletsMessageEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 图片空间信息分类
 */
let AppletsMessageEntity = class AppletsMessageEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '类别名称' }),
    __metadata("design:type", String)
], AppletsMessageEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '给谁的？' }),
    __metadata("design:type", Number)
], AppletsMessageEntity.prototype, "masterId", void 0);
__decorate([
    typeorm_1.Column({ comment: '谁发的？' }),
    __metadata("design:type", Number)
], AppletsMessageEntity.prototype, "authorId", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章ID' }),
    __metadata("design:type", Number)
], AppletsMessageEntity.prototype, "postId", void 0);
__decorate([
    typeorm_1.Column({ comment: '回复id' }),
    __metadata("design:type", Number)
], AppletsMessageEntity.prototype, "replyId", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章标题', nullable: true }),
    __metadata("design:type", String)
], AppletsMessageEntity.prototype, "postTitle", void 0);
__decorate([
    typeorm_1.Column({ comment: '回复内容', default: '' }),
    __metadata("design:type", String)
], AppletsMessageEntity.prototype, "replyContent", void 0);
__decorate([
    typeorm_1.Column({ comment: '是否已读 1:已读 0:未读', default: 0 }),
    __metadata("design:type", Number)
], AppletsMessageEntity.prototype, "hasRead", void 0);
AppletsMessageEntity = __decorate([
    orm_1.EntityModel('applets_message')
], AppletsMessageEntity);
exports.AppletsMessageEntity = AppletsMessageEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLGlCQUFVO0NBd0JuRCxDQUFBO0FBdEJHO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7a0RBQ2Y7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3NEQUNYO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7c0RBQ1g7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztvREFDYjtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7cURBQ1o7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3VEQUMxQjtBQUdsQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MERBQ3BCO0FBR3JCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O3FEQUNsQztBQXZCUCxvQkFBb0I7SUFEaEMsaUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQztHQUNsQixvQkFBb0IsQ0F3QmhDO0FBeEJZLG9EQUFvQiJ9