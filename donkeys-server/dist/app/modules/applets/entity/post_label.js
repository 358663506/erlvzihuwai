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
exports.AppletsPostLablelEntity = void 0;
/* 文章 标签  */
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
const label_1 = require("./label");
const post_1 = require("./post");
const photoWallType_1 = require("./photoWallType");
/**
 * 中间表 （文章、标签）
 */
let AppletsPostLablelEntity = class AppletsPostLablelEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => post_1.AppletsPostEntity, (post) => post.labels),
    __metadata("design:type", post_1.AppletsPostEntity)
], AppletsPostLablelEntity.prototype, "post", void 0);
__decorate([
    typeorm_1.ManyToOne(() => label_1.AppletsLabelEntity, (label) => label.labels),
    __metadata("design:type", label_1.AppletsLabelEntity)
], AppletsPostLablelEntity.prototype, "label", void 0);
__decorate([
    typeorm_1.ManyToOne(() => photoWallType_1.AppletsPhotoWallTypeEntity, (photo) => photo.labels),
    __metadata("design:type", photoWallType_1.AppletsPhotoWallTypeEntity)
], AppletsPostLablelEntity.prototype, "photoWallType", void 0);
AppletsPostLablelEntity = __decorate([
    orm_1.EntityModel('applets_post_label')
], AppletsPostLablelEntity);
exports.AppletsPostLablelEntity = AppletsPostLablelEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdF9sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvcG9zdF9sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxZQUFZO0FBQ1osdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBb0M7QUFDcEMsbUNBQTZDO0FBQzdDLGlDQUEyQztBQUMzQyxtREFBNkQ7QUFDN0Q7O0dBRUc7QUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGlCQUFVO0NBWXRELENBQUE7QUFURztJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7OEJBQ3BELHdCQUFpQjtxREFBQztBQUl4QjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQWtCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7OEJBQ3RELDBCQUFrQjtzREFBQztBQUkxQjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsMENBQTBCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7OEJBQ3RELDBDQUEwQjs4REFBQztBQVhqQyx1QkFBdUI7SUFEbkMsaUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQztHQUNyQix1QkFBdUIsQ0FZbkM7QUFaWSwwREFBdUIifQ==