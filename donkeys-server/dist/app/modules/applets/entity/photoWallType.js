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
exports.AppletsPhotoWallTypeEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const post_label_1 = require("./post_label");
const collect_1 = require("./collect");
const photoWall_1 = require("./photoWall");
const core_1 = require("@cool-midway/core");
const history_1 = require("./history");
/**
 * 图片信息分类
 */
let AppletsPhotoWallTypeEntity = class AppletsPhotoWallTypeEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '类别名称' }),
    __metadata("design:type", String)
], AppletsPhotoWallTypeEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '父分类ID', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], AppletsPhotoWallTypeEntity.prototype, "parentId", void 0);
__decorate([
    typeorm_1.Column({ comment: '排序', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], AppletsPhotoWallTypeEntity.prototype, "sort", void 0);
__decorate([
    typeorm_1.Column({ comment: '活动时间', nullable: true }),
    __metadata("design:type", Date)
], AppletsPhotoWallTypeEntity.prototype, "departureTime", void 0);
__decorate([
    typeorm_1.Column({ comment: '封面', nullable: true }),
    __metadata("design:type", String)
], AppletsPhotoWallTypeEntity.prototype, "img", void 0);
__decorate([
    typeorm_1.OneToMany(() => collect_1.AppletsCollectEntity, (collect) => collect.photoWallType),
    __metadata("design:type", Array)
], AppletsPhotoWallTypeEntity.prototype, "collects", void 0);
__decorate([
    typeorm_1.OneToMany(() => photoWall_1.AppletsPhotoWallEntity, (photo) => photo.classify),
    __metadata("design:type", Array)
], AppletsPhotoWallTypeEntity.prototype, "photoWalls", void 0);
__decorate([
    typeorm_1.OneToMany(() => history_1.AppletsHistoryEntity, (history) => history.photoWallType),
    __metadata("design:type", Array)
], AppletsPhotoWallTypeEntity.prototype, "historys", void 0);
__decorate([
    typeorm_1.OneToMany(() => post_label_1.AppletsPostLablelEntity, (post_label) => post_label.post),
    __metadata("design:type", Array)
], AppletsPhotoWallTypeEntity.prototype, "labels", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], AppletsPhotoWallTypeEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '备注', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], AppletsPhotoWallTypeEntity.prototype, "remark", void 0);
__decorate([
    typeorm_1.Column({ comment: '访问量', default: 0 }),
    __metadata("design:type", Number)
], AppletsPhotoWallTypeEntity.prototype, "visitCount", void 0);
AppletsPhotoWallTypeEntity = __decorate([
    orm_1.EntityModel('applets_photo_wall_type')
], AppletsPhotoWallTypeEntity);
exports.AppletsPhotoWallTypeEntity = AppletsPhotoWallTypeEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvcGhvdG9XYWxsVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMscUNBQTRDO0FBQzVDLDZDQUF1RDtBQUN2RCx1Q0FBaUQ7QUFDakQsMkNBQXFEO0FBQ3JELDRDQUErQztBQUMvQyx1Q0FBaUQ7QUFDakQ7O0dBRUc7QUFFSCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLGlCQUFVO0NBMEN6RCxDQUFBO0FBeENHO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7d0RBQ2Y7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs0REFDN0M7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0RBQzlDO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQzdCLElBQUk7aUVBQUM7QUFHcEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3VEQUM5QjtBQUlaO0lBREMsbUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyw4QkFBb0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7NERBQ3pDO0FBSWpDO0lBREMsbUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQ0FBc0IsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7OERBQzlCO0FBTXJDO0lBREMsbUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyw4QkFBb0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7NERBQ3pDO0FBSWpDO0lBREMsbUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQ0FBdUIsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs7MERBQ3hDO0FBR2xDO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OzBEQUNsRDtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7OzBEQUN6QztBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzs4REFDcEI7QUF6Q1YsMEJBQTBCO0lBRHRDLGlCQUFXLENBQUMseUJBQXlCLENBQUM7R0FDMUIsMEJBQTBCLENBMEN0QztBQTFDWSxnRUFBMEIifQ==