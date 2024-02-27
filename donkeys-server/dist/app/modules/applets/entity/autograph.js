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
exports.AppletsAutographEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const core_1 = require("@cool-midway/core");
const agreement_1 = require("./agreement");
/**
 * 回复
 */
let AppletsAutographEntity = class AppletsAutographEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => agreement_1.AppletsAgreementEntity, (agreement) => agreement.autographs),
    __metadata("design:type", agreement_1.AppletsAgreementEntity)
], AppletsAutographEntity.prototype, "agreement", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.AppletsUserEntity, (user) => user.replys),
    __metadata("design:type", user_1.AppletsUserEntity)
], AppletsAutographEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ comment: '签名内容', type: 'text' }),
    __metadata("design:type", String)
], AppletsAutographEntity.prototype, "content", void 0);
AppletsAutographEntity = __decorate([
    orm_1.EntityModel('applets_autograph')
], AppletsAutographEntity);
exports.AppletsAutographEntity = AppletsAutographEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2dyYXBoLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvYXV0b2dyYXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBNEM7QUFDNUMsaUNBQTJDO0FBQzNDLDRDQUErQztBQUMvQywyQ0FBcUQ7QUFDckQ7O0dBRUc7QUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLGlCQUFVO0NBYXJELENBQUE7QUFWRztJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsa0NBQXNCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7OEJBQ2xFLGtDQUFzQjt5REFBQztBQUlsQztJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7OEJBQ3BELHdCQUFpQjtvREFBQztBQUl4QjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7dURBQzFCO0FBWFAsc0JBQXNCO0lBRGxDLGlCQUFXLENBQUMsbUJBQW1CLENBQUM7R0FDcEIsc0JBQXNCLENBYWxDO0FBYlksd0RBQXNCIn0=