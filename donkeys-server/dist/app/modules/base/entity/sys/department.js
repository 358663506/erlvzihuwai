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
exports.BaseSysDepartmentEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 部门
 */
let BaseSysDepartmentEntity = class BaseSysDepartmentEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '部门名称' }),
    __metadata("design:type", String)
], BaseSysDepartmentEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '上级部门ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], BaseSysDepartmentEntity.prototype, "parentId", void 0);
__decorate([
    typeorm_1.Column({ comment: '排序', default: 0 }),
    __metadata("design:type", Number)
], BaseSysDepartmentEntity.prototype, "orderNum", void 0);
BaseSysDepartmentEntity = __decorate([
    orm_1.EntityModel('base_sys_department')
], BaseSysDepartmentEntity);
exports.BaseSysDepartmentEntity = BaseSysDepartmentEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL2RlcGFydG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGlCQUFVO0NBV3RELENBQUE7QUFURztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3FEQUNmO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7eURBQzdDO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzt5REFDckI7QUFSUix1QkFBdUI7SUFEbkMsaUJBQVcsQ0FBQyxxQkFBcUIsQ0FBQztHQUN0Qix1QkFBdUIsQ0FXbkM7QUFYWSwwREFBdUIifQ==