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
exports.AppletsAgreementEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const core_1 = require("@cool-midway/core");
const autograph_1 = require("./autograph");
/**
 * 回复
 */
let AppletsAgreementEntity = class AppletsAgreementEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '协议标题' }),
    __metadata("design:type", String)
], AppletsAgreementEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章内容', type: 'text' }),
    __metadata("design:type", String)
], AppletsAgreementEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ comment: '二维码', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsAgreementEntity.prototype, "qrcode", void 0);
__decorate([
    typeorm_1.OneToMany(() => autograph_1.AppletsAutographEntity, (autograph) => autograph.agreement),
    __metadata("design:type", Array)
], AppletsAgreementEntity.prototype, "autographs", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态: 0:隐藏协议 1:开放签名 2:禁用签名', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], AppletsAgreementEntity.prototype, "status", void 0);
AppletsAgreementEntity = __decorate([
    orm_1.EntityModel('applets_agreement')
], AppletsAgreementEntity);
exports.AppletsAgreementEntity = AppletsAgreementEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWVtZW50LmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvYWdyZWVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLDJDQUFxRDtBQUNyRDs7R0FFRztBQUVILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsaUJBQVU7Q0F1QnJELENBQUE7QUFyQkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztxREFDZDtBQUlkO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOzt1REFDMUI7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7c0RBQ3pDO0FBSWY7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLGtDQUFzQixFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDOzswREFDdkM7QUFTckM7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOztzREFDOUQ7QUF0Qk4sc0JBQXNCO0lBRGxDLGlCQUFXLENBQUMsbUJBQW1CLENBQUM7R0FDcEIsc0JBQXNCLENBdUJsQztBQXZCWSx3REFBc0IifQ==