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
exports.BaseAppSpaceInfoEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 文件空间信息
 */
let BaseAppSpaceInfoEntity = class BaseAppSpaceInfoEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '地址' }),
    __metadata("design:type", String)
], BaseAppSpaceInfoEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ comment: '类型' }),
    __metadata("design:type", String)
], BaseAppSpaceInfoEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ comment: '分类ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], BaseAppSpaceInfoEntity.prototype, "classifyId", void 0);
BaseAppSpaceInfoEntity = __decorate([
    orm_1.EntityModel('base_app_space_info')
], BaseAppSpaceInfoEntity);
exports.BaseAppSpaceInfoEntity = BaseAppSpaceInfoEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvc3BhY2UvZW50aXR5L2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLGlCQUFVO0NBU3JELENBQUE7QUFQRztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUNkO0FBR1o7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztvREFDYjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzBEQUN6QztBQVJWLHNCQUFzQjtJQURsQyxpQkFBVyxDQUFDLHFCQUFxQixDQUFDO0dBQ3RCLHNCQUFzQixDQVNsQztBQVRZLHdEQUFzQiJ9