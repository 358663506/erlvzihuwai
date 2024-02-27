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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NwYWNlL2VudGl0eS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxpQkFBVTtDQVNyRCxDQUFBO0FBUEc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDZDtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBQ2I7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzswREFDekM7QUFSVixzQkFBc0I7SUFEbEMsaUJBQVcsQ0FBQyxxQkFBcUIsQ0FBQztHQUN0QixzQkFBc0IsQ0FTbEM7QUFUWSx3REFBc0IifQ==