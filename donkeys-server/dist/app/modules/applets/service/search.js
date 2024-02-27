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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL3NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQTREO0FBQzVELHVDQUFrRDtBQUNsRCxxQ0FBK0M7QUFDL0MsOERBQThEO0FBQzlELHlDQUFtRDtBQUNuRCx5Q0FBbUQ7QUFDbkQsK0NBQXlEO0FBQ3pELDJEQUFxRTtBQUNyRSxtREFBNkQ7QUFDN0QsMkNBQXNEO0FBQ3RELFFBQVE7QUFFUixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLGtCQUFXO0lBc0JqRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDWixNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEdBQUcsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUI7YUFDakMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO2FBQzFCLE1BQU0sQ0FBQztZQUNKLGtEQUFrRDtZQUNsRCxjQUFjO1lBQ2QsdUJBQXVCO1lBQ3ZCLE9BQU87WUFDUCxjQUFjO1lBQ2QsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osZUFBZTtZQUNmLFFBQVE7WUFDUixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1NBQ25CLENBQUM7YUFDRCxLQUFLLENBQUMsYUFBYSxDQUFDO2FBQ3BCLFFBQVEsQ0FDTCxJQUFJLGtCQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNoQixJQUFJLElBQUksSUFBSSxlQUFlLEVBQUU7Z0JBQ3pCLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDckI7UUFDTCxDQUFDLENBQUMsQ0FDTDthQUNBLFFBQVEs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