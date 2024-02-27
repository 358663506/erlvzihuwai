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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9waG90b1dhbGxUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBZ0Q7QUFDaEQsMkRBQXFFO0FBQ3JFLHFDQUErQztBQUMvQyx1Q0FBa0Q7QUFDbEQsMkJBQTRCO0FBQzVCLCtDQUF5RDtBQUN6RCwrQ0FBeUQ7QUFFekQsU0FBUztBQUVULElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTRCLFNBQVEsa0JBQVc7SUFTeEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ1osTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUN4RCxpQkFBaUI7UUFDakIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQzNELElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLDBCQUEwQjthQUM3QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7YUFDdkIsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDdEosS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNkLFFBQVEsQ0FDTCxJQUFJLGtCQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUM3QixJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDZixJQUFJLENBQUMsTUFBTTt3QkFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ25FO2dCQUNELGlCQUFpQjthQUNwQjtpQkFBTTtnQkFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLENBQ0w7YUFDQSx1QkFBdUIsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUM7YUFDM0QsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU87YUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07YUFDakIsT0FBTyxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDO2FBQzlDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU87WUFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUVmLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDeEI7U0FDSixDQUFDO0lBQ04sQ0FBQztJQUNEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBVTtRQUN2QixJQUFJLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksaUJBQWlCLEVBQUU7WUFDbkIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxhQUFhLEVBQUUsaUJBQWlCO2FBQ25DLENBQUMsQ0FBQztZQUNILE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztnQkFDbkMsYUFBYSxFQUFFLGlCQUFpQjthQUNuQyxDQUFDLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0osQ0FBQTtBQS9ERztJQURDLHVCQUFpQixDQUFDLDBDQUEwQixDQUFDOzhCQUNsQixvQkFBVTsrRUFBNkI7QUFHbkU7SUFEQyx1QkFBaUIsQ0FBQyw4QkFBb0IsQ0FBQzs4QkFDbEIsb0JBQVU7eUVBQXVCO0FBR3ZEO0lBREMsdUJBQWlCLENBQUMsOEJBQW9CLENBQUM7OEJBQ2xCLG9CQUFVO3lFQUF1QjtBQVI5QywyQkFBMkI7SUFEdkMsbUJBQU8sRUFBRTtHQUNHLDJCQUEyQixDQWlFdkM7QUFqRVksa0VBQTJCIn0=