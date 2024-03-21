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
exports.AppletsCarouselEntity = void 0;
/* 轮播图 */
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 轮播图
 */
let AppletsCarouselEntity = class AppletsCarouselEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '图片名称' }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '跳转链接', nullable: true }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ comment: '图片', unique: true }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "img", void 0);
__decorate([
    typeorm_1.Column({ comment: '链接类型 0:完整链接', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], AppletsCarouselEntity.prototype, "urlType", void 0);
__decorate([
    typeorm_1.Column({ comment: '排序', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], AppletsCarouselEntity.prototype, "sort", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], AppletsCarouselEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '备注', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "remark", void 0);
AppletsCarouselEntity = __decorate([
    orm_1.EntityModel('applets_carousel')
], AppletsCarouselEntity);
exports.AppletsCarouselEntity = AppletsCarouselEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L2Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFNBQVM7QUFDVCx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUFpQztBQUVqQzs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsaUJBQVU7Q0FxQnBELENBQUE7QUFuQkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzttREFDZjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDaEM7QUFHWjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQzVCO0FBR1o7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7c0RBQy9DO0FBR2hCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUM5QztBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7O3FEQUNsRDtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O3FEQUN6QztBQXBCTixxQkFBcUI7SUFEakMsaUJBQVcsQ0FBQyxrQkFBa0IsQ0FBQztHQUNuQixxQkFBcUIsQ0FxQmpDO0FBckJZLHNEQUFxQiJ9