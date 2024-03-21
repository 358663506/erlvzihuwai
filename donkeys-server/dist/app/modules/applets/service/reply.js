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
exports.AppletsReplyService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const post_1 = require("../entity/post");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
const reply_1 = require("../entity/reply");
const R = require("ramda");
/* 回复信息 */
let AppletsReplyService = class AppletsReplyService extends core_1.BaseService {
    /**
     * 回复
     * @param param
     */
    async add(param) {
        throw new core_1.CoolCommException('非法操作！');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ id: this.ctx.appUser.userId });
        // 查询文章
        let postInfo = await this.appletsPostEntity.findOne({ id: param.postId });
        if (!postInfo) {
            throw new core_1.CoolCommException('文章不存在');
        }
        // 添加到评论
        let reply = new reply_1.AppletsReplayEntity();
        reply.content = param.content;
        reply.post = postInfo;
        reply.user = userInfo;
        if (userInfo.role < 3 && param.replyId) {
            // 回复评论
            reply.reply = await this.appletsReplayEntity.findOne({ id: param.replyId });
        }
        await this.appletsReplayEntity.save(reply);
        // 部分数据返回
        reply.post = null;
        let user = R.pick(['nickName', 'avatarUrl', 'id'], reply.user);
        reply.user = user;
        return reply;
    }
    /* 分页查询 */
    async page(query) {
        const { size, page, sort } = query;
        let result = await this.appletsReplayEntity
            .createQueryBuilder('c')
            .select([
            'c.id',
            'c.createTime',
            'c.updateTime',
            'c.content',
            'user.id',
            'user.nickName',
            'user.avatarUrl',
            'replysuser.id',
            'replysuser.nickName',
            'replysuser.avatarUrl'
        ])
            .where('c.replyId IS NULL')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (query.postId) {
                qb.where('c.postId = :postId', { postId: query.postId });
            }
        }))
            .leftJoin('c.user', 'user')
            .leftJoinAndSelect('c.replys', 'replys', 'replys.replyId = c.id')
            .leftJoin('replys.user', 'replysuser')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'c.createTime': sort || 'DESC', 'replys.createTime': 'DESC' })
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
};
__decorate([
    orm_1.InjectEntityModel(post_1.AppletsPostEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsReplyService.prototype, "appletsPostEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsReplyService.prototype, "appletsUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(reply_1.AppletsReplayEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsReplyService.prototype, "appletsReplayEntity", void 0);
AppletsReplyService = __decorate([
    decorator_1.Provide()
], AppletsReplyService);
exports.AppletsReplyService = AppletsReplyService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9yZXBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBRW5FLHlDQUFtRDtBQUNuRCx1Q0FBa0Q7QUFDbEQscUNBQStDO0FBQy9DLHlDQUFtRDtBQUNuRCwyQ0FBc0Q7QUFDdEQsMkJBQTJCO0FBRTNCLFVBQVU7QUFFVixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLGtCQUFXO0lBU2hEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBa0I7UUFDeEIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE9BQU87UUFDUCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RixPQUFPO1FBQ1AsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksd0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7UUFDRCxRQUFRO1FBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSwyQkFBbUIsRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM5QixLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUN0QixLQUFLLENBQUMsSUFBSSxHQUFH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