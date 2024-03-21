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
exports.AppletsMusterAddressEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 活动集合地址
 */
let AppletsMusterAddressEntity = class AppletsMusterAddressEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '是否有效0:有效，1无效', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AppletsMusterAddressEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '地点名称' }),
    __metadata("design:type", String)
], AppletsMusterAddressEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '集合时间', nullable: true }),
    __metadata("design:type", String)
], AppletsMusterAddressEntity.prototype, "muster_time", void 0);
AppletsMusterAddressEntity = __decorate([
    orm_1.EntityModel('applets_muster_address')
], AppletsMusterAddressEntity);
exports.AppletsMusterAddressEntity = AppletsMusterAddressEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzdGVyX2FkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L211c3Rlcl9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQStCO0FBRy9COztHQUVHO0FBRUgsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSxpQkFBVTtDQWF6RCxDQUFBO0FBVEc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MERBQ2xEO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzt3REFDZjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzsrREFDeEI7QUFWWCwwQkFBMEI7SUFEdEMsaUJBQVcsQ0FBQyx3QkFBd0IsQ0FBQztHQUN6QiwwQkFBMEIsQ0FhdEM7QUFiWSxnRUFBMEIifQ==