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
exports.EnrollEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 系统用户
 */
let EnrollEntity = class EnrollEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '活动名称', nullable: true }),
    __metadata("design:type", String)
], EnrollEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '活动介绍' }),
    __metadata("design:type", String)
], EnrollEntity.prototype, "introduce", void 0);
__decorate([
    typeorm_1.Column({ comment: '是否有效0:有效，1无效' }),
    __metadata("design:type", Number)
], EnrollEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '报名开关0可，1否', nullable: true }),
    __metadata("design:type", Number)
], EnrollEntity.prototype, "registration_flg", void 0);
__decorate([
    typeorm_1.Column({ comment: '修改开关0可，1否', nullable: true }),
    __metadata("design:type", Number)
], EnrollEntity.prototype, "update_flg", void 0);
__decorate([
    typeorm_1.Column({ comment: '最大报名人数', nullable: true }),
    __metadata("design:type", Number)
], EnrollEntity.prototype, "most_count", void 0);
__decorate([
    typeorm_1.Column({ comment: '活动图片', nullable: true }),
    __metadata("design:type", String)
], EnrollEntity.prototype, "img", void 0);
EnrollEntity = __decorate([
    orm_1.EntityModel('applets_enroll')
], EnrollEntity);
exports.EnrollEntity = EnrollEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2VudGl0eS9lbnJvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBd0M7QUFFeEM7O0dBRUc7QUFFSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsaUJBQVU7Q0F1QjNDLENBQUE7QUFwQkc7SUFGQyxlQUFLLEVBQUU7SUFDUCxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzBDQUMvQjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7K0NBQ1Y7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDOzs0Q0FDckI7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7c0RBQ3hCO0FBR3pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDOUI7QUFHbkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7O2dEQUMxQjtBQUduQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7eUNBQ2hDO0FBckJILFlBQVk7SUFEeEIsaUJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztHQUNqQixZQUFZLENBdUJ4QjtBQXZCWSxvQ0FBWSJ9