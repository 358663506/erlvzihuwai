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
exports.AppletsUserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
/* 微信小程序用户 */
let AppletsUserService = class AppletsUserService extends core_1.BaseService {
    /**
     * 修改权限
     * @param query
     */
    async role(userParams) {
        const userInfo = await this.appletsUserEntity.findOne({ id: userParams.id });
        if (!userInfo) {
            throw new core_1.CoolCommException('用户不存在');
        }
        userInfo.role = userParams.role;
        await this.coolCache.set(`applets:role:${userInfo.id}`, userInfo.role);
        await this.appletsUserEntity.save(userInfo);
    }
    /**
     * 用户信息
     * @param query
     */
    async info(id) {
        let userInfo = await this.appletsUserEntity
            .createQueryBuilder('c')
            .where('1 = 1')
            .andWhere('c.id = :id', { id })
            .loadRelationCountAndMap('c.collectCount', 'c.collects')
            .loadRelationCountAndMap('c.historyCount', 'c.historys')
            .getOne();
        return userInfo;
    }
    async infoByApp() {
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        let userInfo = await this.appletsUserEntity
            .createQueryBuilder('c')
            .where('1 = 1')
            .andWhere('c.openId = :openId', { openId: appUser.openId })
            .loadRelationCountAndMap('c.collectCount', 'c.collects')
            .loadRelationCountAndMap('c.historyCount', 'c.historys')
            .getOne();
        return userInfo;
    }
};
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsUserService.prototype, "appletsUserEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], AppletsUserService.prototype, "coolCache", void 0);
AppletsUserService = __decorate([
    decorator_1.Provide()
], AppletsUserService);
exports.AppletsUserService = AppletsUserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUErRTtBQUMvRSx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLHlDQUFtRDtBQUduRCxhQUFhO0FBRWIsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxrQkFBVztJQU8vQzs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQXVCO1FBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQU87UUFDZCxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUI7YUFDdEMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDZCxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDOUIsdUJBQXVCLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDO2FBQ3ZELHVCQUF1QixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQzthQUN2RCxNQUFNLEVBQUUsQ0FBQztRQUNkLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxLQUFLLENBQUMsU0FBUztRQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQjthQUN0QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7YUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNkLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDMUQsdUJBQXVCLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDO2FBQ3ZELHVCQUF1QixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQzthQUN2RCxNQUFNLEVBQUUsQ0FBQztRQUNkLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7Q0FDSixDQUFBO0FBN0NHO0lBREMsdUJBQWlCLENBQUMsd0JBQWlCLENBQUM7OEJBQ2xCLG9CQUFVOzZEQUFvQjtBQUdqRDtJQURDLGtCQUFNLENBQUMsWUFBWSxDQUFDOztxREFDQztBQUxiLGtCQUFrQjtJQUQ5QixtQkFBTyxFQUFFO0dBQ0csa0JBQWtCLENBK0M5QjtBQS9DWSxnREFBa0IifQ==