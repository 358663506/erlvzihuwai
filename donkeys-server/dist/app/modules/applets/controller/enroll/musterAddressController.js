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
exports.MusterAddressController = void 0;
/* 微信用户 */
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const musterAddressService_1 = require("../../service/musterAddressService");
/* 集合地址服务 */
let MusterAddressController = class MusterAddressController extends core_1.BaseController {
    /**
     * 报名活动列表
     * @returns
     */
    async page(query) {
        return this.ok(await this.musterAddressService.page(query));
    }
    /**
     * 添加活动
     * @returns
     */
    async add(data = {}) {
        return this.ok(await this.musterAddressService.add(data));
    }
    /**
     * 修改
     * @returns
     */
    async update(data = {}) {
        return this.ok(await this.musterAddressService.update(data));
    }
    /**
     * 集合地址状态修改
     */
    async order(id) {
        return this.ok(await this.musterAddressService.status(id));
    }
    /**
     * 地址详情
     * @returns
     */
    async info(id) {
        return this.ok(await this.musterAddressService.info(id));
    }
    /**
     * 删除
     * @returns
     */
    async delete(id) {
        return this.ok(await this.musterAddressService.deleteById(id));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", musterAddressService_1.MusterAddressService)
], MusterAddressController.prototype, "musterAddressService", void 0);
__decorate([
    decorator_1.Post('/page', { summary: '集合地址列表' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MusterAddressController.prototype, "page", null);
__decorate([
    decorator_1.Post('/add', { summary: '添加集合地址' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MusterAddressController.prototype, "add", null);
__decorate([
    decorator_1.Post('/update', { summary: '修改' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MusterAddressController.prototype, "update", null);
__decorate([
    decorator_1.Post('/status', { summary: '集合地址状态修改' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusterAddressController.prototype, "order", null);
__decorate([
    decorator_1.Post('/info', { summary: '地址详情' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusterAddressController.prototype, "info", null);
__decorate([
    decorator_1.Post('/delete', { summary: '删除' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MusterAddressController.prototype, "delete", null);
MusterAddressController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController("/musterAdress")
], MusterAddressController);
exports.MusterAddressController = MusterAddressController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzdGVyQWRkcmVzc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9lbnJvbGwvbXVzdGVyQWRkcmVzc0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBVTtBQUNWLG1EQUFxRTtBQUNyRSw0Q0FBbUU7QUFDbkUsNkVBQXdFO0FBR3hFLFlBQVk7QUFHWixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLHFCQUFjO0lBSXZEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQVksS0FBSztRQUU5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUdEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxHQUFHLENBQVksT0FBWSxFQUFFO1FBRXRDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLE1BQU0sQ0FBWSxPQUFZLEVBQUU7UUFFekMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxLQUFLLENBQVMsRUFBVTtRQUUxQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQVMsRUFBVTtRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxNQUFNLENBQVMsRUFBVTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNKLENBQUE7QUEzREc7SUFEQyxrQkFBTSxFQUFFOzhCQUNhLDJDQUFvQjtxRUFBQztBQU8zQztJQURDLGdCQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLFdBQUEsZ0JBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQTs7OzttREFHM0I7QUFRRDtJQURDLGdCQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLFdBQUEsZ0JBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQTs7OztrREFHMUI7QUFPRDtJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2QsV0FBQSxnQkFBSSxDQUFDLGVBQUcsQ0FBQyxDQUFBOzs7O3FEQUc3QjtBQU1EO0lBREMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDNUIsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7b0RBR2xCO0FBT0Q7SUFEQyxnQkFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNoQixXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7OzttREFFeEI7QUFPRDtJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2QsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7cURBRTFCO0FBNURRLHVCQUF1QjtJQUZuQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQyxlQUFlLENBQUM7R0FDbkIsdUJBQXVCLENBNkRuQztBQTdEWSwwREFBdUIifQ==