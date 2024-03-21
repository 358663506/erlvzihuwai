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
exports.AppletsEnrollMusterAddressEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const core_1 = require("@cool-midway/core");
/**
 * 活动关联地址信息
 */
let AppletsEnrollMusterAddressEntity = class AppletsEnrollMusterAddressEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '报名活动关联ID', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AppletsEnrollMusterAddressEntity.prototype, "enroll_id", void 0);
__decorate([
    typeorm_1.Column({ comment: '报名活动地址ID', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AppletsEnrollMusterAddressEntity.prototype, "muster_address_id", void 0);
__decorate([
    typeorm_1.Column({ comment: '地点名称' }),
    __metadata("design:type", String)
], AppletsEnrollMusterAddressEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '集合时间', nullable: true }),
    __metadata("design:type", String)
], AppletsEnrollMusterAddressEntity.prototype, "muster_time", void 0);
AppletsEnrollMusterAddressEntity = __decorate([
    orm_1.EntityModel('applets_enroll_muster_address')
], AppletsEnrollMusterAddressEntity);
exports.AppletsEnrollMusterAddressEntity = AppletsEnrollMusterAddressEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsX211c3Rlcl9hZGRyZXNzLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2VudGl0eS9lbnJvbGxfbXVzdGVyX2FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUFzQztBQUN0Qyw0Q0FBNkM7QUFHN0M7O0dBRUc7QUFFSCxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFpQyxTQUFRLGlCQUFVO0NBaUIvRCxDQUFBO0FBWkc7SUFGQyxlQUFLLEVBQUU7SUFDUCxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bUVBQzNDO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJFQUNuQztBQUcxQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7OzhEQUNmO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3FFQUN4QjtBQWRYLGdDQUFnQztJQUQ1QyxpQkFBVyxDQUFDLCtCQUErQixDQUFDO0dBQ2hDLGdDQUFnQyxDQWlCNUM7QUFqQlksNEVBQWdDIn0=