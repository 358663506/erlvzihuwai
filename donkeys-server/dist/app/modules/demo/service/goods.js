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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9kZW1vL3NlcnZpY2UvZ29vZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUF3RTtBQUN4RSx1Q0FBa0Q7QUFDbEQscUNBQWlFO0FBQ2pFLDJDQUFrRDtBQUdsRDs7R0FFRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsa0JBQVc7SUFPN0M7O09BRUc7SUFFSCxLQUFLLENBQUMsR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQVc7UUFDekIsTUFBTSxVQUFVLEdBQUcsdUJBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ25ELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVILEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBVyxFQUFFLFdBQXlCO1FBQ3hELEtBQUs7UUFDTCxPQUFPO1FBQ1AsVUFBVTtJQUNkLENBQUM7Q0FDSixDQUFBO0FBL0JHO0lBREMsdUJBQWlCLENBQUMsdUJBQWUsQ0FBQzs4QkFDZixvQkFBVTs0REFBa0I7QUFHaEQ7SUFEQyxrQkFBTSxDQUFDLFlBQVksQ0FBQzs7bURBQ0M7QUFNdEI7SUFEQyxZQUFLLENBQUMsQ0FBQyxDQUFDOzs7OzJDQUdSO0FBZUQ7SUFEQyxzQkFBZSxDQUFDLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxDQUFDOzs7O3VEQUs5QztBQWhDUSxnQkFBZ0I7SUFENUIsbUJBQU8sRUFBRTtHQUNHLGdCQUFnQixDQWlDNUI7QUFqQ1ksNENBQWdCIn0=