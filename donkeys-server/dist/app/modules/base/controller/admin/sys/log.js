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
exports.BaseSysLogController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const log_1 = require("../../../entity/sys/log");
const user_1 = require("../../../entity/sys/user");
const conf_1 = require("../../../service/sys/conf");
const log_2 = require("../../../service/sys/log");
/**
 * 系统日志
 */
let BaseSysLogController = class BaseSysLogController extends core_1.BaseController {
    /**
     * 清空日志
     */
    async clear() {
        await this.baseSysLogService.clear(true);
        return this.ok();
    }
    /**
     * 设置日志保存时间
     */
    async setKeep(value) {
        await this.baseSysConfService.updateVaule('logKeep', value);
        return this.ok();
    }
    /**
     * 获得日志保存时间
     */
    async getKeep() {
        return this.ok(await this.baseSysConfService.getValue('logKeep'));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", log_2.BaseSysLogService)
], BaseSysLogController.prototype, "baseSysLogService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", conf_1.BaseSysConfService)
], BaseSysLogController.prototype, "baseSysConfService", void 0);
__decorate([
    decorator_1.Post('/clear', { summary: '清理' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "clear", null);
__decorate([
    decorator_1.Post('/setKeep', { summary: '日志保存时间' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "setKeep", null);
__decorate([
    decorator_1.Get('/getKeep', { summary: '获得日志保存时间' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "getKeep", null);
BaseSysLogController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['page'],
        entity: log_1.BaseSysLogEntity,
        urlTag: {
            name: 'a',
            url: ['add']
        },
        pageQueryOp: {
            keyWordLikeFields: ['b.name', 'a.params', 'a.ipAddr'],
            select: ['a.*', 'b.name'],
            leftJoin: [
                {
                    entity: user_1.BaseSysUserEntity,
                    alias: 'b',
                    condition: 'a.userId = b.id'
                }
            ]
        }
    })
], BaseSysLogController);
exports.BaseSysLogController = BaseSysLogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL3N5cy9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXVFO0FBQ3ZFLDRDQUFtRTtBQUNuRSxpREFBMkQ7QUFDM0QsbURBQTZEO0FBQzdELG9EQUErRDtBQUMvRCxrREFBNkQ7QUFFN0Q7O0dBRUc7QUFxQkgsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxxQkFBYztJQU9wRDs7T0FFRztJQUVJLEtBQUssQ0FBQyxLQUFLO1FBQ2QsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUVJLEtBQUssQ0FBQyxPQUFPLENBQVMsS0FBYTtRQUN0QyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUVJLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0osQ0FBQTtBQTlCRztJQURDLGtCQUFNLEVBQUU7OEJBQ1UsdUJBQWlCOytEQUFDO0FBR3JDO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7Z0VBQUM7QUFNdkM7SUFEQyxnQkFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OztpREFJakM7QUFNRDtJQURDLGdCQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7O21EQUczQjtBQU1EO0lBREMsZUFBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzs7OzttREFHeEM7QUEvQlEsb0JBQW9CO0lBcEJoQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNiLE1BQU0sRUFBRSxzQkFBZ0I7UUFDeEIsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLEdBQUc7WUFDVCxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDZjtRQUNELFdBQVcsRUFBRTtZQUNULGlCQUFpQixFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7WUFDckQsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQztZQUN6QixRQUFRLEVBQUU7Z0JBQ047b0JBQ0ksTUFBTSxFQUFFLHdCQUFpQjtvQkFDekIsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsU0FBUyxFQUFFLGlCQUFpQjtpQkFDL0I7YUFDSjtTQUNKO0tBQ0osQ0FBQztHQUNXLG9CQUFvQixDQWdDaEM7QUFoQ1ksb0RBQW9CIn0=