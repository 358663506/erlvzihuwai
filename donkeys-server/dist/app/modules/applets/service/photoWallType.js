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
exports.AppletsPhotoWallTypeService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const photoWallType_1 = require("../entity/photoWallType");
const typeorm_1 = require("typeorm");
const orm_1 = require("@midwayjs/orm");
const R = require("ramda");
const history_1 = require("../entity/history");
const collect_1 = require("../entity/collect");
/* 照片墙 */
let AppletsPhotoWallTypeService = class AppletsPhotoWallTypeService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort, status = 1 } = query;
        // 后台 admin 默认查全部
        const { userId } = this.ctx.admin || { userId: undefined };
        let result = await this.appletsPhotoWallTypeEntity
            .createQueryBuilder('a')
            .select(['a.id', 'a.createTime', 'a.departureTime', 'a.status', 'a.img', 'a.name', 'a.parentId', 'a.remark', 'a.sort', 'a.updateTime', 'a.visitCount'])
            .where('1 = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (R.type(status) === 'Number') {
                if (status !== -1) {
                    if (!userId)
                        qb.where('a.status = :status', { status: status });
                }
                // 后台 admin 默认查全部
            }
            else {
                qb.where('a.status = 1');
            }
        }))
            .loadRelationCountAndMap('a.photoWallCount', 'a.photoWalls')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.departureTime': sort || 'DESC' })
            .getManyAndCount();
        return {
            list: result[0],
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
    /**
     * 删除照片墙
     * @param id
     */
    async deleteById(id) {
        let photoWallTypeInfo = await this.appletsPhotoWallTypeEntity.findOne({ id: id });
        if (photoWallTypeInfo) {
            await this.appletsHistoryEntity.delete({
                photoWallType: photoWallTypeInfo
            });
            await this.appletsCollectEntity.delete({
                photoWallType: photoWallTypeInfo
            });
            await this.appletsPhotoWallTypeEntity.delete({ id });
        }
        return '';
    }
};
__decorate([
    orm_1.InjectEntityModel(photoWallType_1.AppletsPhotoWallTypeEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPhotoWallTypeService.prototype, "appletsPhotoWallTypeEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(history_1.AppletsHistoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPhotoWallTypeService.prototype, "appletsHistoryEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(collect_1.AppletsCollectEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsPhotoWallTypeService.prototype, "appletsCollectEntity", void 0);
AppletsPhotoWallTypeService = __decorate([
    decorator_1.Provide()
], AppletsPhotoWallTypeService);
exports.AppletsPhotoWallTypeService = AppletsPhotoWallTypeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL3Bob3RvV2FsbFR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDRDQUFnRDtBQUNoRCwyREFBcUU7QUFDckUscUNBQStDO0FBQy9DLHVDQUFrRDtBQUNsRCwyQkFBNEI7QUFDNUIsK0NBQXlEO0FBQ3pELCtDQUF5RDtBQUV6RCxTQUFTO0FBRVQsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBNEIsU0FBUSxrQkFBVztJQVN4RDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDWixNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3hELGlCQUFpQjtRQUNqQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDM0QsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsMEJBQTBCO2FBQzdDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQzthQUN2QixNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUN0SixLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ2QsUUFBUSxDQUNMLElBQUksa0JBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNmLElBQUksQ0FBQyxNQUFNO3dCQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDbkU7Z0JBQ0QsaUJBQWlCO2FBQ3BCO2lCQUFNO2dCQUNILEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDNUI7UUFDTCxDQUFDLENBQUMsQ0FDTDthQUNBLHVCQUF1QixDQUFDLGtCQUFrQixFQUFFLGNBQWMsQ0FBQzthQUMzRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTzthQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTthQUNqQixPQUFPLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLElBQUksTUFBTSxFQUFFLENBQUM7YUFDOUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsT0FBTztZQUNILElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRWYsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUN4QjtTQUNKLENBQUM7SUFDTixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFVO1FBQ3ZCLElBQUksaUJBQWlCLEdBQUcsTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxpQkFBaUIsRUFBRTtZQUNuQixNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7Z0JBQ25DLGFBQWEsRUFBRSxpQkFBaUI7YUFDbkMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxhQUFhLEVBQUUsaUJBQWlCO2FBQ25DLENBQUMsQ0FBQztZQUNILE1BQU0sSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSixDQUFBO0FBL0RHO0lBREMsdUJBQWlCLENBQUMsMENBQTBCLENBQUM7OEJBQ2xCLG9CQUFVOytFQUE2QjtBQUduRTtJQURDLHVCQUFpQixDQUFDLDhCQUFvQixDQUFDOzhCQUNsQixvQkFBVTt5RUFBdUI7QUFHdkQ7SUFEQyx1QkFBaUIsQ0FBQyw4QkFBb0IsQ0FBQzs4QkFDbEIsb0JBQVU7eUVBQXVCO0FBUjlDLDJCQUEyQjtJQUR2QyxtQkFBTyxFQUFFO0dBQ0csMkJBQTJCLENBaUV2QztBQWpFWSxrRUFBMkIifQ==