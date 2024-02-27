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
exports.DemoUserEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 实体类crud demo
 */
let DemoUserEntity = class DemoUserEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '头像' }),
    __metadata("design:type", String)
], DemoUserEntity.prototype, "headImg", void 0);
__decorate([
    typeorm_1.Column({ comment: '姓名' }),
    __metadata("design:type", String)
], DemoUserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '年龄' }),
    __metadata("design:type", Number)
], DemoUserEntity.prototype, "age", void 0);
__decorate([
    typeorm_1.Column({ comment: '出生日期' }),
    __metadata("design:type", Date)
], DemoUserEntity.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column({
        type: 'tinyint',
        comment: '性别 0-未知 1-男 2-女',
        default: 0
    }),
    __metadata("design:type", Number)
], DemoUserEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ comment: '介绍', nullable: true }),
    __metadata("design:type", String)
], DemoUserEntity.prototype, "introduce", void 0);
DemoUserEntity = __decorate([
    core_1.CoolEntityCrud(),
    orm_1.EntityModel('demo_user')
], DemoUserEntity);
exports.DemoUserEntity = DemoUserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vZW50aXR5L3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErRDtBQUMvRCxxQ0FBaUM7QUFFakM7O0dBRUc7QUFHSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsaUJBQVU7Q0FzQjdDLENBQUE7QUFwQkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzsrQ0FDVjtBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzRDQUNiO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzsyQ0FDZDtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs4QkFDakIsSUFBSTtpREFBQztBQU9oQjtJQUxDLGdCQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLENBQUM7S0FDYixDQUFDOzs0Q0FDVztBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDeEI7QUFyQlQsY0FBYztJQUYxQixxQkFBYyxFQUFFO0lBQ2hCLGlCQUFXLENBQUMsV0FBVyxDQUFDO0dBQ1osY0FBYyxDQXNCMUI7QUF0Qlksd0NBQWMifQ==