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
exports.DemoGoodsService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const goods_1 = require("../entity/goods");
/**
 * 商品
 */
let DemoGoodsService = class DemoGoodsService extends core_1.BaseService {
    /**
     * 返回所有数据
     */
    async all() {
        return this.demoAppGoodsEntity.find();
    }
    async stopLottery(params) {
        const connection = typeorm_1.getConnection();
        const queryRunner = connection.createQueryRunner();
        await this.testTransaction(params, queryRunner);
        return '';
    }
    /**
     * 事务
     * @param params
     * @param queryRunner
     */
    async testTransaction(params, queryRunner) {
        // 关闭
        // 停止报名
        //计算已报名的分数
    }
};
__decorate([
    orm_1.InjectEntityModel(goods_1.DemoGoodsEntity),
    __metadata("design:type", typeorm_1.Repository)
], DemoGoodsService.prototype, "demoAppGoodsEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], DemoGoodsService.prototype, "coolCache", void 0);
__decorate([
    core_1.Cache(5),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoGoodsService.prototype, "all", null);
__decorate([
    core_1.CoolTransaction({ isolation: 'SERIALIZABLE' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DemoGoodsService.prototype, "testTransaction", null);
DemoGoodsService = __decorate([
    decorator_1.Provide()
], DemoGoodsService);
exports.DemoGoodsService = DemoGoodsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vc2VydmljZS9nb29kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQXdFO0FBQ3hFLHVDQUFrRDtBQUNsRCxxQ0FBaUU7QUFDakUsMkNBQWtEO0FBR2xEOztHQUVHO0FBRUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxrQkFBVztJQU83Qzs7T0FFRztJQUVILEtBQUssQ0FBQyxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBVztRQUN6QixNQUFNLFVBQVUsR0FBRyx1QkFBYSxFQUFFLENBQUM7UUFDbkMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbkQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNoRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFXLEVBQUUsV0FBeUI7UUFDeEQsS0FBSztRQUNMLE9BQU87UUFDUCxVQUFVO0lBQ2QsQ0FBQztDQUNKLENBQUE7QUEvQkc7SUFEQyx1QkFBaUIsQ0FBQyx1QkFBZSxDQUFDOzhCQUNmLG9CQUFVOzREQUFrQjtBQUdoRDtJQURDLGtCQUFNLENBQUMsWUFBWSxDQUFDOzttREFDQztBQU10QjtJQURDLFlBQUssQ0FBQyxDQUFDLENBQUM7Ozs7MkNBR1I7QUFlRDtJQURDLHNCQUFlLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLENBQUM7Ozs7dURBSzlDO0FBaENRLGdCQUFnQjtJQUQ1QixtQkFBTyxFQUFFO0dBQ0csZ0JBQWdCLENBaUM1QjtBQWpDWSw0Q0FBZ0IifQ==