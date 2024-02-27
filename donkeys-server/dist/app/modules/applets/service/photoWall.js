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
exports.AppletsPhotoWallService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const photoWall_1 = require("../entity/photoWall");
const photoWallType_1 = require("../entity/photoWallType");
const history_1 = require("./history");
/* 照片墙 */
let AppletsPhotoWallService = class AppletsPhotoWallService extends core_1.BaseService {
    /**
     * 修改分类
     */
    async move(param) {
        let classifyInfo = await this.appletsPhotoWallTypeEntity.findOne({
            id: param.classifyId
        });
        if (!classifyInfo) {
            throw new core_1.CoolCommException('分类不存在');
        }
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(photoWall_1.AppletsPhotoWallEntity)
            .set({ classify: classifyInfo })
            .where({ id: typeorm_1.In(param.ids) })
            .execute();
        return '';
    }
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { classifyId, isVisitCount = false, size = 15, page = 1, sort } = query;
        let photoWallTypeInfo = new photoWallType_1.AppletsPhotoWallTypeEntity();
        if (classifyId && classifyId > 0) {
            photoWallTypeInfo = await this.appletsPhotoWallTypeEntity.findOne({
                id: classifyId
            });
            if (!photoWallTypeInfo) {
                throw new core_1.CoolCommException('分类不存在');
            }
            if (isVisitCount) {
                photoWallTypeInfo.visitCount += 1;
                await this.appletsPhotoWallTypeEntity.save(photoWallTypeInfo);
            }
            if (page === 1) {
                this.appletsHistoryService.save({
                    photoWallType: photoWallTypeInfo,
                    post: undefined
                });
            }
        }
        let result = await this.appletsPhotoWallEntity
            .createQueryBuilder('a')
            .where('1 = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (classifyId > 0) {
                qb.where('a.classifyId = :classifyId', { classifyId: classifyId });
            }
            else if (classifyId == -1) {
                qb.where('a.classifyId IS NULL');
            }
        }))
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort || 'DESC' })
            .getManyAndCount();
        return {
            list: result[0],
            typeInfo: photoWallTypeInfo,
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
};
__decorate([
    orm_1.InjectEntityModel(photoWall_1.AppletsPhotoWallEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPhotoWallService.prototype, "appletsPhotoWallEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", history_1.AppletsHistoryService)
], AppletsPhotoWallService.prototype, "appletsHistoryService", void 0);
__decorate([
    orm_1.InjectEntityModel(photoWallType_1.AppletsPhotoWallTypeEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPhotoWallService.prototype, "appletsPhotoWallTypeEntity", void 0);
AppletsPhotoWallService = __decorate([
    decorator_1.Provide()
], AppletsPhotoWallService);
exports.AppletsPhotoWallService = AppletsPhotoWallService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL3Bob3RvV2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBa0U7QUFDbEUsbURBQTZEO0FBRTdELDJEQUFxRTtBQUNyRSx1Q0FBa0Q7QUFFbEQsU0FBUztBQUVULElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsa0JBQVc7SUFVcEQ7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQXVCO1FBQzlCLElBQUksWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQztZQUM3RCxFQUFFLEVBQUUsS0FBSyxDQUFDLFVBQVU7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztRQUNELE1BQU0sdUJBQWEsRUFBRTthQUNoQixrQkFBa0IsRUFBRTthQUNwQixNQUFNLENBQUMsa0NBQXNCLENBQUM7YUFDOUIsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDO2FBQy9CLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxZQUFFLENBQVMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDcEMsT0FBTyxFQUFFLENBQUM7UUFDZixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDWixNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxJQUFJLEdB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