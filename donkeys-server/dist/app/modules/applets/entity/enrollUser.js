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
exports.EnrollUserEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 系统用户
 */
let EnrollUserEntity = class EnrollUserEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '报名活动关联ID', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], EnrollUserEntity.prototype, "enroll_id", void 0);
__decorate([
    typeorm_1.Column({ comment: '微信名称', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ comment: '手机', length: 100 }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column({ comment: '集合地点ID', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], EnrollUserEntity.prototype, "enroll_muster_address_id", void 0);
__decorate([
    typeorm_1.Column({ comment: '是否自驾0否，1是', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], EnrollUserEntity.prototype, "driver_flg", void 0);
__decorate([
    typeorm_1.Column({ comment: '自驾出发地址', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "driver_address", void 0);
__decorate([
    typeorm_1.Column({ comment: '真实姓名', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "real_name", void 0);
__decorate([
    typeorm_1.Column({ comment: '身份证号', nullable: true, length: 20 }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "id_card", void 0);
__decorate([
    typeorm_1.Column({ comment: '保险单号', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "policy_no", void 0);
__decorate([
    typeorm_1.Column({ comment: '保险照片', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "policy_img", void 0);
__decorate([
    typeorm_1.Column({ comment: '是否愿意吃晚餐0，吃，1:不吃，2都可以', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], EnrollUserEntity.prototype, "dinner_lfg", void 0);
__decorate([
    typeorm_1.Column({ comment: '紧急联系人', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "emergency_contact", void 0);
__decorate([
    typeorm_1.Column({ comment: '紧急联系人电话', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "emergency_contact_mobile", void 0);
__decorate([
    typeorm_1.Column({ comment: 'openid', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "openid", void 0);
__decorate([
    typeorm_1.Column({ comment: 'unionid', nullable: true }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "unionid", void 0);
__decorate([
    typeorm_1.Column({ comment: '0:参加，1:退出', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], EnrollUserEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '性别' }),
    __metadata("design:type", String)
], EnrollUserEntity.prototype, "sex", void 0);
__decorate([
    typeorm_1.Column({ comment: '是否委托组织购买保险，0否，1是', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], EnrollUserEntity.prototype, "policy_flg", void 0);
EnrollUserEntity = __decorate([
    orm_1.EntityModel('applets_enroll_user')
], EnrollUserEntity);
exports.EnrollUserEntity = EnrollUserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsVXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvZW5yb2xsVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUF3QztBQUV4Qzs7R0FFRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsaUJBQVU7Q0EyRC9DLENBQUE7QUF4REc7SUFGQyxlQUFLLEVBQUU7SUFDUCxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQzNDO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDL0I7QUFJYjtJQUZDLGVBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7O2dEQUN4QjtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tFQUMxQjtBQUdqQztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOztvREFDM0M7QUFJbkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dEQUN2QjtBQUl2QjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQzFCO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7O2lEQUN4QztBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQzFCO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztvREFDekI7QUFHbkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOztvREFDdEQ7QUFJbkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJEQUNuQjtBQUcxQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0VBQ2Q7QUFHakM7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUMvQjtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDL0I7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7Z0RBQy9DO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDOzs2Q0FDYjtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7b0RBQ2xEO0FBMURWLGdCQUFnQjtJQUQ1QixpQkFBVyxDQUFDLHFCQUFxQixDQUFDO0dBQ3RCLGdCQUFnQixDQTJENUI7QUEzRFksNENBQWdCIn0=