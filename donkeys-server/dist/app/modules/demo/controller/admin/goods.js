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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYWRtaW4vZ29vZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBRW5ELDRDQUErRTtBQUMvRSw4Q0FBcUQ7QUFHckQ7O0dBRUc7QUE0Q0gsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxxQkFBYztJQUN4RDs7T0FFRztJQUdILEtBQUssQ0FBQyxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKLENBQUE7QUFIRztJQUZDLGlCQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3pCLGVBQUcsQ0FBQyxRQUFRLENBQUM7Ozs7cURBR2I7QUFSUSx3QkFBd0I7SUEzQ3BDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ1osYUFBYTtRQUNiLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELFFBQVE7UUFDUixNQUFNLEVBQUUsdUJBQWU7UUFDdkIsZUFBZTtRQUNmLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUU7WUFDaEMsT0FBTztnQkFDSCxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO2FBQzNCLENBQUM7UUFDTixDQUFDO1FBQ0QsWUFBWTtRQUNaLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxhQUFhO1lBQ25CLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNoQjtRQUNELGVBQWU7UUFDZixrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUM3QixTQUFTO1FBQ1QsV0FBVyxFQUFFO1lBQ1QsaUJBQWlCO1lBQ2pCLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDO1lBQzVCLGNBQWM7WUFDZCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsZ0JBQWdCO1lBQ2hCLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBeUMsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFDRCxTQUFTO1lBQ1QsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsRUFBRTtnQkFDMUIsT0FBTztvQkFDSCxTQUFTO29CQUNULENBQUMsa0JBQWtCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQ3hDLENBQUM7WUFDTixDQUFDO1lBQ0QsT0FBTztZQUNQLFVBQVUsRUFBRTtnQkFDUixZQUFZO2dCQUNaLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1NBQ0o7S0FDSixDQUFDO0dBQ1csd0JBQXdCLENBU3BDO0FBVFksNERBQXdCIn0=