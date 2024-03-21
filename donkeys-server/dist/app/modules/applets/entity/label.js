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
exports.AppletsLabelEntity = void 0;
/* 标签 */
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const core_1 = require("@cool-midway/core");
const typeorm_2 = require("typeorm");
const post_label_1 = require("./post_label");
/**
 * 标签
 */
let AppletsLabelEntity = class AppletsLabelEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_2.Column({ comment: '标签名称' }),
    __metadata("design:type", String)
], AppletsLabelEntity.prototype, "name", void 0);
__decorate([
    typeorm_2.Column({ comment: '搜索次数', default: 0 }),
    __metadata("design:type", Number)
], AppletsLabelEntity.prototype, "count", void 0);
__decorate([
    typeorm_1.OneToMany(() => post_label_1.AppletsPostLablelEntity, (post_label) => post_label.label),
    __metadata("design:type", Array)
], AppletsLabelEntity.prototype, "labels", void 0);
AppletsLabelEntity = __decorate([
    orm_1.EntityModel('applets_label')
], AppletsLabelEntity);
exports.AppletsLabelEntity = AppletsLabelEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L2xhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUix1Q0FBNEM7QUFDNUMscUNBQW9DO0FBQ3BDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFDakMsNkNBQXVEO0FBRXZEOztHQUVHO0FBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxpQkFBVTtDQVVqRCxDQUFBO0FBUkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztnREFDZjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOztpREFDMUI7QUFJZDtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsb0NBQXVCLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7O2tEQUN6QztBQVR6QixrQkFBa0I7SUFEOUIsaUJBQVcsQ0FBQyxlQUFlLENBQUM7R0FDaEIsa0JBQWtCLENBVTlCO0FBVlksZ0RBQWtCIn0=