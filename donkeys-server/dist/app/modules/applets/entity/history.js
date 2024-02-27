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
exports.AppletsHistoryEntity = void 0;
/* 足迹 */
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const post_1 = require("./post");
const photoWallType_1 = require("./photoWallType");
/**
 * 足迹
 */
let AppletsHistoryEntity = class AppletsHistoryEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => post_1.AppletsPostEntity, (post) => post.historys),
    __metadata("design:type", post_1.AppletsPostEntity)
], AppletsHistoryEntity.prototype, "post", void 0);
__decorate([
    typeorm_1.ManyToOne(() => photoWallType_1.AppletsPhotoWallTypeEntity, (type) => type.historys),
    __metadata("design:type", photoWallType_1.AppletsPhotoWallTypeEntity)
], AppletsHistoryEntity.prototype, "photoWallType", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.AppletsUserEntity, (user) => user.historys),
    __metadata("design:type", user_1.AppletsUserEntity)
], AppletsHistoryEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ comment: '浏览次数', default: 1, nullable: true }),
    __metadata("design:type", Number)
], AppletsHistoryEntity.prototype, "count", void 0);
AppletsHistoryEntity = __decorate([
    orm_1.EntityModel('applets_history')
], AppletsHistoryEntity);
exports.AppletsHistoryEntity = AppletsHistoryEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L2hpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUTtBQUNSLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQTRDO0FBQzVDLGlDQUEyQztBQUMzQyxpQ0FBMkM7QUFDM0MsbURBQTZEO0FBQzdEOztHQUVHO0FBRUgsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxpQkFBVTtDQWVuRCxDQUFBO0FBWkc7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUFpQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzhCQUN0RCx3QkFBaUI7a0RBQUM7QUFJeEI7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLDBDQUEwQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzhCQUN0RCwwQ0FBMEI7MkRBQUM7QUFJMUM7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUFpQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzhCQUN0RCx3QkFBaUI7a0RBQUM7QUFHeEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQzFDO0FBZEwsb0JBQW9CO0lBRGhDLGlCQUFXLENBQUMsaUJBQWlCLENBQUM7R0FDbEIsb0JBQW9CLENBZWhDO0FBZlksb0RBQW9CIn0=