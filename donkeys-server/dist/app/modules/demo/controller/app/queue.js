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
exports.DemoQueueController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const comm_1 = require("../../queue/comm");
const getter_1 = require("../../queue/getter");
/**
 * 队列
 */
let DemoQueueController = class DemoQueueController extends core_1.BaseController {
    /**
     * 发送数据到队列
     */
    async queue() {
        this.demoCommQueue.add({ a: 2 });
        return this.ok();
    }
    /**
     * 获得队列中的数据，只有当队列类型为getter时有效
     */
    async getter() {
        const job = await this.demoCommQueue.getters.getJobs(['wait'], 0, 0, true);
        // 获得完将数据从队列移除
        await job[0].remove();
        return this.ok(job[0].data);
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", comm_1.DemoCommQueue)
], DemoQueueController.prototype, "demoCommQueue", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", getter_1.DemoGetterQueue)
], DemoQueueController.prototype, "demoGetterQueue", void 0);
__decorate([
    decorator_1.Post('/add', { summary: '发送队列数据' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoQueueController.prototype, "queue", null);
__decorate([
    decorator_1.Get('/getter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoQueueController.prototype, "getter", null);
DemoQueueController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], DemoQueueController);
exports.DemoQueueController = DemoQueueController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL3F1ZXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFpRTtBQUNqRSw0Q0FBbUU7QUFDbkUsMkNBQWlEO0FBQ2pELCtDQUFxRDtBQUVyRDs7R0FFRztBQUdILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEscUJBQWM7SUFTbkQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE1BQU07UUFDUixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0UsY0FBYztRQUNkLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNKLENBQUE7QUF6Qkc7SUFEQyxrQkFBTSxFQUFFOzhCQUNNLG9CQUFhOzBEQUFDO0FBSTdCO0lBREMsa0JBQU0sRUFBRTs4QkFDUSx3QkFBZTs0REFBQztBQU1qQztJQURDLGdCQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzs7O2dEQUluQztBQU1EO0lBREMsZUFBRyxDQUFDLFNBQVMsQ0FBQzs7OztpREFNZDtBQTNCUSxtQkFBbUI7SUFGL0IsbUJBQU8sRUFBRTtJQUNULHFCQUFjLEVBQUU7R0FDSixtQkFBbUIsQ0E0Qi9CO0FBNUJZLGtEQUFtQiJ9