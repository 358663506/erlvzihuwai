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
exports.AppletsPhotoWallEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
const photoWallType_1 = require("./photoWallType");
/**
 * 图片文件信息
 */
let AppletsPhotoWallEntity = class AppletsPhotoWallEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '图片地址' }),
    __metadata("design:type", String)
], AppletsPhotoWallEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ comment: '类型', nullable: true }),
    __metadata("design:type", String)
], AppletsPhotoWallEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => photoWallType_1.AppletsPhotoWallTypeEntity, (type) => type.photoWalls),
    __metadata("design:type", photoWallType_1.AppletsPhotoWallTypeEntity)
], AppletsPhotoWallEntity.prototype, "classify", void 0);
AppletsPhotoWallEntity = __decorate([
    orm_1.EntityModel('applets_photo_wall')
], AppletsPhotoWallEntity);
exports.AppletsPhotoWallEntity = AppletsPhotoWallEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2VudGl0eS9waG90b1dhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBNEM7QUFDNUMsbURBQTZEO0FBRTdEOztHQUVHO0FBRUgsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxpQkFBVTtDQVVyRCxDQUFBO0FBUkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzttREFDaEI7QUFHWjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBQzdCO0FBSWI7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLDBDQUEwQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzhCQUM3RCwwQ0FBMEI7d0RBQUM7QUFUNUIsc0JBQXNCO0lBRGxDLGlCQUFXLENBQUMsb0JBQW9CLENBQUM7R0FDckIsc0JBQXNCLENBVWxDO0FBVlksd0RBQXNCIn0=