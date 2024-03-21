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
exports.BaseSysUserEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 系统用户
 */
let BaseSysUserEntity = class BaseSysUserEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '部门ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "departmentId", void 0);
__decorate([
    typeorm_1.Column({ comment: '姓名', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ comment: '用户名', length: 100 }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ comment: '密码' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        comment: '密码版本, 作用是改完密码，让原来的token失效',
        default: 1
    }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "passwordV", void 0);
__decorate([
    typeorm_1.Column({ comment: '昵称', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "nickName", void 0);
__decorate([
    typeorm_1.Column({ comment: '头像', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "headImg", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '手机', nullable: true, length: 20 }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ comment: '邮箱', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "remark", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: 'socketId', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "socketId", void 0);
BaseSysUserEntity = __decorate([
    orm_1.EntityModel('base_sys_user')
], BaseSysUserEntity);
exports.BaseSysUserEntity = BaseSysUserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBd0M7QUFFeEM7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLGlCQUFVO0NBOENoRCxDQUFBO0FBM0NHO0lBRkMsZUFBSyxFQUFFO0lBQ1AsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3VEQUN2QztBQUdyQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQzdCO0FBSWI7SUFGQyxlQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkIsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzttREFDdkI7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDVDtBQU1qQjtJQUpDLGdCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsMkJBQTJCO1FBQ3BDLE9BQU8sRUFBRSxDQUFDO0tBQ2IsQ0FBQzs7b0RBQ2dCO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDekI7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUMxQjtBQUloQjtJQUZDLGVBQUssRUFBRTtJQUNQLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDOztnREFDeEM7QUFHZDtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Z0RBQzVCO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUMzQjtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7O2lEQUNsRDtBQU9mO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDL0I7QUE3Q1IsaUJBQWlCO0lBRDdCLGlCQUFXLENBQUMsZUFBZSxDQUFDO0dBQ2hCLGlCQUFpQixDQThDN0I7QUE5Q1ksOENBQWlCIn0=