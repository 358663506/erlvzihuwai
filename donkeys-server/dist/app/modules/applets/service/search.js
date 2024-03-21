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
exports.AppletsSearchService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
// import { HistoryDTO, DelHistoryDTO } from '../dto/collect';
const post_1 = require("../entity/post");
const user_1 = require("../entity/user");
const history_1 = require("../entity/history");
const photoWallType_1 = require("../entity/photoWallType");
const photoWall_1 = require("../entity/photoWall");
const reply_1 = require("../entity/reply");
/* 足迹 */
let AppletsSearchService = class AppletsSearchService extends core_1.BaseService {
    /**
     * 分页查询
     * @param param
     */
    async page(query) {
        const { title, type, sort = 'DESC' } = query;
        const tableUn = this.appletsPostEntity
            .createQueryBuilder('post')
            .select([
            'SUBSTR(MD5(RAND()),floor(RAND()*26)+1,6) as __id',
            'id as postId',
            "'' as photoWallTypeId",
            'title',
            'articleCover',
            'createTime',
            'updateTime',
            'visitCount',
            'departureTime',
            'status',
            'destinationPos',
            "'post' as type"
        ])
            .where('status != 0')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (type == 'photoWallType') {
                qb.where('1 = 0');
            }
        }))
            .getQuery();
        const tableTg = this.appletsPhotoWallTypeEntity
            .createQueryBuilder('photo')
            .select([
            'SUBSTR(MD5(RAND()),floor(RAND()*26)+1,6) as __id',
            "'' as postId",
            'id as photoWallTypeId',
            'name',
            'img',
            'createTime',
            'updateTime',
            'visitCount',
            'departureTime',
            'status',
            "'' as destinationPos",
            "'photoWallType' as type"
        ])
            .where('status = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (type == 'post') {
                qb.where('1 = 0');
            }
        }))
            .getQuery();
        const sql = `
        SELECT
            a.photoWallTypeId,
            a.__id,
            a.postId,
            a.title,
            a.articleCover,
            a.createTime,
            a.updateTime,
            a.visitCount,
            a.departureTime,
            a.status,
            a.destinationPos,
            a.type
        FROM 
            ((${tableUn}) UNION (${tableTg})) as a
        WHERE 1 = 1
           ${this.setSql(title, 'and a.title LIKE ?', [`%${title}%`])}
        ORDER BY departureTime ${sort}
        `;
        let result = await this.sqlRenderPage(sql, query, true);
        for (let i = 0; i < result.list.length; i++) {
            const it = result.list[i];
            if (it.photoWallTypeId) {
                it.photoWallCount = await this.appletsPhotoWallEntity.createQueryBuilder('a').where('classifyId = :classifyId', { classifyId: it.photoWallTypeId }).getCount();
                it.replyCount = '';
            }
            else if (it.postId) {
                it.photoWallCount = '';
                it.replyCount = await this.appletsReplayEntity.createQueryBuilder('a').where('postId = :postId', { postId: it.postId }).getCount();
            }
        }
        return result;
    }
};
__decorate([
    orm_1.InjectEntityModel(history_1.AppletsHistoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsSearchService.prototype, "appletsHistoryEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(photoWallType_1.AppletsPhotoWallTypeEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsSearchService.prototype, "appletsPhotoWallTypeEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(post_1.AppletsPostEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsSearchService.prototype, "appletsPostEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsSearchService.prototype, "appletsUserEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], AppletsSearchService.prototype, "coolCache", void 0);
__decorate([
    orm_1.InjectEntityModel(photoWall_1.AppletsPhotoWallEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsSearchService.prototype, "appletsPhotoWallEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(reply_1.AppletsReplayEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsSearchService.prototype, "appletsReplayEntity", void 0);
AppletsSearchService = __decorate([
    decorator_1.Provide()
], AppletsSearchService);
exports.AppletsSearchService = AppletsSearchService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL3NlcnZpY2Uvc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBNEQ7QUFDNUQsdUNBQWtEO0FBQ2xELHFDQUErQztBQUMvQyw4REFBOEQ7QUFDOUQseUNBQW1EO0FBQ25ELHlDQUFtRDtBQUNuRCwrQ0FBeUQ7QUFDekQsMkRBQXFFO0FBQ3JFLG1EQUE2RDtBQUM3RCwyQ0FBc0Q7QUFDdEQsUUFBUTtBQUVSLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsa0JBQVc7SUFzQmpEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNaLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQjthQUNqQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7YUFDMUIsTUFBTSxDQUFDO1lBQ0osa0RBQWtEO1lBQ2xELGNBQWM7WUFDZCx1QkFBdUI7WUFDdkIsT0FBTztZQUNQLGNBQWM7WUFDZCxZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixlQUFlO1lBQ2YsUUFBUTtZQUNSLGdCQUFnQjtZQUNoQixnQkFBZ0I7U0FDbkIsQ0FBQzthQUNELEtBQUssQ0FBQyxhQUFhLENBQUM7YUFDcEIsUUFBUSxDQUNMLElBQUksa0JBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2hCLElBQUksSUFBSSxJQUFJLGVBQWUsRUFBRTtnQkFDekIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNyQjtRQUNMLENBQUMsQ0FBQyxDQUNMO2FBQ0EsUUFBUSxF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