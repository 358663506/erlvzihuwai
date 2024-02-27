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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L3Bob3RvV2FsbFR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUE0QztBQUM1Qyw2Q0FBdUQ7QUFDdkQsdUNBQWlEO0FBQ2pELDJDQUFxRDtBQUNyRCw0Q0FBK0M7QUFDL0MsdUNBQWlEO0FBQ2pEOztHQUVHO0FBRUgsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSxpQkFBVTtDQTBDekQsQ0FBQTtBQXhDRztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3dEQUNmO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NERBQzdDO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dEQUM5QztBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUM3QixJQUFJO2lFQUFDO0FBR3BCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt1REFDOUI7QUFJWjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsOEJBQW9CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7OzREQUN6QztBQUlqQztJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsa0NBQXNCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7OzhEQUM5QjtBQU1yQztJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsOEJBQW9CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7OzREQUN6QztBQUlqQztJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsb0NBQXVCLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7OzBEQUN4QztBQUdsQztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzswREFDbEQ7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOzswREFDekM7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7OERBQ3BCO0FBekNWLDBCQUEwQjtJQUR0QyxpQkFBVyxDQUFDLHlCQUF5QixDQUFDO0dBQzFCLDBCQUEwQixDQTBDdEM7QUExQ1ksZ0VBQTBCIn0=