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
exports.BaseAppSpaceTypeEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 图片空间信息分类
 */
let BaseAppSpaceTypeEntity = class BaseAppSpaceTypeEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '类别名称' }),
    __metadata("design:type", String)
], BaseAppSpaceTypeEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '父分类ID', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], BaseAppSpaceTypeEntity.prototype, "parentId", void 0);
BaseAppSpaceTypeEntity = __decorate([
    orm_1.EntityModel('base_app_space_type')
], BaseAppSpaceTypeEntity);
exports.BaseAppSpaceTypeEntity = BaseAppSpaceTypeEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2UvZW50aXR5L2FwcC9zcGFjZS90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxpQkFBVTtDQU1yRCxDQUFBO0FBSkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztvREFDZjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dEQUM3QztBQUxSLHNCQUFzQjtJQURsQyxpQkFBVyxDQUFDLHFCQUFxQixDQUFDO0dBQ3RCLHNCQUFzQixDQU1sQztBQU5ZLHdEQUFzQiJ9