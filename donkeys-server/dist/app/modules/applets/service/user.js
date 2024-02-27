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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBK0U7QUFDL0UsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyx5Q0FBbUQ7QUFHbkQsYUFBYTtBQUViLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsa0JBQVc7SUFPL0M7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUF1QjtRQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztRQUNELFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNoQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFPO1FBQ2QsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCO2FBQ3RDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQzthQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ2QsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2FBQzlCLHVCQUF1QixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQzthQUN2RCx1QkFBdUIsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUM7YUFDdkQsTUFBTSxFQUFFLENBQUM7UUFDZCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0QsS0FBSyxDQUFDLFNBQVM7UUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUI7YUFDdEMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDZCxRQUFRLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzFELHVCQUF1QixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQzthQUN2RCx1QkFBdUIsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUM7YUFDdkQsTUFBTSxFQUFFLENBQUM7UUFDZCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0NBQ0osQ0FBQTtBQTdDRztJQURDLHVCQUFpQixDQUFDLHdCQUFpQixDQUFDOzhCQUNsQixvQkFBVTs2REFBb0I7QUFHakQ7SUFEQyxrQkFBTSxDQUFDLFlBQVksQ0FBQzs7cURBQ0M7QUFMYixrQkFBa0I7SUFEOUIsbUJBQU8sRUFBRTtHQUNHLGtCQUFrQixDQStDOUI7QUEvQ1ksZ0RBQWtCIn0=