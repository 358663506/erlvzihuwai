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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL3NlcnZpY2UvcGhvdG9XYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFrRTtBQUNsRSxtREFBNkQ7QUFFN0QsMkRBQXFFO0FBQ3JFLHVDQUFrRDtBQUVsRCxTQUFTO0FBRVQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxrQkFBVztJQVVwRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBdUI7UUFDOUIsSUFBSSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDO1lBQzdELEVBQUUsRUFBRSxLQUFLLENBQUMsVUFBVTtTQUN2QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsTUFBTSx1QkFBYSxFQUFFO2FBQ2hCLGtCQUFrQixFQUFFO2FBQ3BCLE1BQU0sQ0FBQyxrQ0FBc0IsQ0FBQzthQUM5QixHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQUM7YUFDL0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLFlBQUUsQ0FBUyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUNwQyxPQUFPLEVBQUUsQ0FBQztRQUNmLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNaLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLElBQUksR0FB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