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
exports.AppletsCarouselEntity = void 0;
/* 轮播图 */
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 轮播图
 */
let AppletsCarouselEntity = class AppletsCarouselEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '图片名称' }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '跳转链接', nullable: true }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ comment: '图片', unique: true }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "img", void 0);
__decorate([
    typeorm_1.Column({ comment: '链接类型 0:完整链接', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], AppletsCarouselEntity.prototype, "urlType", void 0);
__decorate([
    typeorm_1.Column({ comment: '排序', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], AppletsCarouselEntity.prototype, "sort", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], AppletsCarouselEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '备注', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], AppletsCarouselEntity.prototype, "remark", void 0);
AppletsCarouselEntity = __decorate([
    orm_1.EntityModel('applets_carousel')
], AppletsCarouselEntity);
exports.AppletsCarouselEntity = AppletsCarouselEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2VudGl0eS9jYXJvdXNlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxTQUFTO0FBQ1QsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGlCQUFVO0NBcUJwRCxDQUFBO0FBbkJHO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7bURBQ2Y7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQ2hDO0FBR1o7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUM1QjtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O3NEQUMvQztBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDOUM7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOztxREFDbEQ7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOztxREFDekM7QUFwQk4scUJBQXFCO0lBRGpDLGlCQUFXLENBQUMsa0JBQWtCLENBQUM7R0FDbkIscUJBQXFCLENBcUJqQztBQXJCWSxzREFBcUIifQ==