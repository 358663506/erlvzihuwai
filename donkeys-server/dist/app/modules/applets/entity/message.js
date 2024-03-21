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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUFpQztBQUVqQzs7R0FFRztBQUVILElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsaUJBQVU7Q0F3Qm5ELENBQUE7QUF0Qkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztrREFDZjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7c0RBQ1g7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztzREFDWDtBQUdqQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O29EQUNiO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztxREFDWjtBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7dURBQzFCO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzswREFDcEI7QUFHckI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7cURBQ2xDO0FBdkJQLG9CQUFvQjtJQURoQyxpQkFBVyxDQUFDLGlCQUFpQixDQUFDO0dBQ2xCLG9CQUFvQixDQXdCaEM7QUF4Qlksb0RBQW9CIn0=