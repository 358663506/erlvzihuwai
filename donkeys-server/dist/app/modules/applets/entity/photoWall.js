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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvcGhvdG9XYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQTRDO0FBQzVDLG1EQUE2RDtBQUU3RDs7R0FFRztBQUVILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsaUJBQVU7Q0FVckQsQ0FBQTtBQVJHO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7bURBQ2hCO0FBR1o7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O29EQUM3QjtBQUliO0lBREMsbUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQ0FBMEIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs4QkFDN0QsMENBQTBCO3dEQUFDO0FBVDVCLHNCQUFzQjtJQURsQyxpQkFBVyxDQUFDLG9CQUFvQixDQUFDO0dBQ3JCLHNCQUFzQixDQVVsQztBQVZZLHdEQUFzQiJ9