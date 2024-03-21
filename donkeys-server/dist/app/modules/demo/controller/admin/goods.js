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
exports.DemoAdminGoodsController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const goods_1 = require("../../entity/goods");
/**
 * 商品
 */
let DemoAdminGoodsController = class DemoAdminGoodsController extends core_1.BaseController {
    /**
     * 其他接口
     */
    async other() {
        return this.ok('hello, cool-admin!!!');
    }
};
__decorate([
    core_1.CoolUrlTag('ignoreToken'),
    decorator_1.Get('/other'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoAdminGoodsController.prototype, "other", null);
DemoAdminGoodsController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        // 添加通用CRUD接口
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        // 设置表实体
        entity: goods_1.DemoGoodsEntity,
        // 向表插入当前登录用户ID
        insertParam: async (ctx) => {
            return {
                userId: ctx.admin.userId
            };
        },
        // 给请求路径打上标签
        urlTag: {
            name: 'ignoreToken',
            url: ['page']
        },
        // info接口忽略价格字段
        infoIgnoreProperty: ['price'],
        // 分页查询配置
        pageQueryOp: {
            // 让title字段支持模糊查询
            keyWordLikeFields: ['title'],
            // 让type字段支持筛选
            fieldEq: ['type'],
            // 4.x 新增 追加其他条件
            extend: async (find) => {
                find.groupBy('a.id');
            },
            // 增加其他条件
            where: async (ctx) => {
                return [
                    // 价格大于90
                    ['a.price > :price', { price: 90.0 }]
                ];
            },
            // 添加排序
            addOrderBy: {
                // 排序字段及排序方式
                price: 'desc'
            }
        }
    })
], DemoAdminGoodsController);
exports.DemoAdminGoodsController = DemoAdminGoodsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vY29udHJvbGxlci9hZG1pbi9nb29kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBbUQ7QUFFbkQsNENBQStFO0FBQy9FLDhDQUFxRDtBQUdyRDs7R0FFRztBQTRDSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLHFCQUFjO0lBQ3hEOztPQUVHO0lBR0gsS0FBSyxDQUFDLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0osQ0FBQTtBQUhHO0lBRkMsaUJBQVUsQ0FBQyxhQUFhLENBQUM7SUFDekIsZUFBRyxDQUFDLFFBQVEsQ0FBQzs7OztxREFHYjtBQVJRLHdCQUF3QjtJQTNDcEMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDWixhQUFhO1FBQ2IsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsUUFBUTtRQUNSLE1BQU0sRUFBRSx1QkFBZTtRQUN2QixlQUFlO1FBQ2YsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBRTtZQUNoQyxPQUFPO2dCQUNILE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU07YUFDM0IsQ0FBQztRQUNOLENBQUM7UUFDRCxZQUFZO1FBQ1osTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLGFBQWE7WUFDbkIsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ2hCO1FBQ0QsZUFBZTtRQUNmLGtCQUFrQixFQUFFLENBQUMsT0FBTyxDQUFDO1FBQzdCLFNBQVM7UUFDVCxXQUFXLEVBQUU7WUFDVCxpQkFBaUI7WUFDakIsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDNUIsY0FBYztZQUNkLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixnQkFBZ0I7WUFDaEIsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUF5QyxFQUFFLEVBQUU7Z0JBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUNELFNBQVM7WUFDVCxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO2dCQUMxQixPQUFPO29CQUNILFNBQVM7b0JBQ1QsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDeEMsQ0FBQztZQUNOLENBQUM7WUFDRCxPQUFPO1lBQ1AsVUFBVSxFQUFFO2dCQUNSLFlBQVk7Z0JBQ1osS0FBSyxFQUFFLE1BQU07YUFDaEI7U0FDSjtLQUNKLENBQUM7R0FDVyx3QkFBd0IsQ0FTcEM7QUFUWSw0REFBd0IifQ==