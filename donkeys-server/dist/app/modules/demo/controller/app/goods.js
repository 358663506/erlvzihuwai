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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoAppGoodsController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const goods_1 = require("../../entity/goods");
const goods_2 = require("../../service/goods");
/**
 * 商品
 */
let DemoAppGoodsController = class DemoAppGoodsController extends core_1.BaseController {
    /**
     * 请求所有
     * @param name 名称
     * @returns
     */
    async all(name, age) {
        return this.ok(await this.demoGoodsService.all());
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", goods_2.DemoGoodsService)
], DemoAppGoodsController.prototype, "demoGoodsService", void 0);
__decorate([
    core_1.CoolUrlTag('ignoreToken'),
    decorator_1.Get('/all', { summary: '获得所有' }),
    __param(0, decorator_1.Query()), __param(1, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DemoAppGoodsController.prototype, "all", null);
DemoAppGoodsController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: goods_1.DemoGoodsEntity,
        urlTag: {
            name: 'ignoreToken',
            url: ['add']
        },
        listQueryOp: {
            keyWordLikeFields: ['title']
        }
    }, {
        middleware: []
    })
], DemoAppGoodsController);
exports.DemoAppGoodsController = DemoAppGoodsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vY29udHJvbGxlci9hcHAvZ29vZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWtFO0FBQ2xFLDRDQUErRTtBQUMvRSw4Q0FBcUQ7QUFDckQsK0NBQXVEO0FBRXZEOztHQUVHO0FBa0JILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEscUJBQWM7SUFJdEQ7Ozs7T0FJRztJQUdILEtBQUssQ0FBQyxHQUFHLENBQVUsSUFBWSxFQUFXLEdBQVc7UUFDakQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNKLENBQUE7QUFaRztJQURDLGtCQUFNLEVBQUU7OEJBQ1Msd0JBQWdCO2dFQUFDO0FBU25DO0lBRkMsaUJBQVUsQ0FBQyxhQUFhLENBQUM7SUFDekIsZUFBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN0QixXQUFBLGlCQUFLLEVBQUUsQ0FBQSxFQUFnQixXQUFBLGlCQUFLLEVBQUUsQ0FBQTs7OztpREFFeEM7QUFiUSxzQkFBc0I7SUFqQmxDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUNYO1FBQ0ksR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLHVCQUFlO1FBQ3ZCLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxhQUFhO1lBQ25CLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNmO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUM7U0FDL0I7S0FDSixFQUNEO1FBQ0ksVUFBVSxFQUFFLEVBQUU7S0FDakIsQ0FDSjtHQUNZLHNCQUFzQixDQWNsQztBQWRZLHdEQUFzQiJ9