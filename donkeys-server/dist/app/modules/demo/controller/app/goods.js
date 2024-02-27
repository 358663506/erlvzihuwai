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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL2dvb2RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBK0U7QUFDL0UsOENBQXFEO0FBQ3JELCtDQUF1RDtBQUV2RDs7R0FFRztBQWtCSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLHFCQUFjO0lBSXREOzs7O09BSUc7SUFHSCxLQUFLLENBQUMsR0FBRyxDQUFVLElBQVksRUFBVyxHQUFXO1FBQ2pELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDSixDQUFBO0FBWkc7SUFEQyxrQkFBTSxFQUFFOzhCQUNTLHdCQUFnQjtnRUFBQztBQVNuQztJQUZDLGlCQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3pCLGVBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdEIsV0FBQSxpQkFBSyxFQUFFLENBQUEsRUFBZ0IsV0FBQSxpQkFBSyxFQUFFLENBQUE7Ozs7aURBRXhDO0FBYlEsc0JBQXNCO0lBakJsQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FDWDtRQUNJLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx1QkFBZTtRQUN2QixNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsYUFBYTtZQUNuQixHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDZjtRQUNELFdBQVcsRUFBRTtZQUNULGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDO1NBQy9CO0tBQ0osRUFDRDtRQUNJLFVBQVUsRUFBRSxFQUFFO0tBQ2pCLENBQ0o7R0FDWSxzQkFBc0IsQ0FjbEM7QUFkWSx3REFBc0IifQ==