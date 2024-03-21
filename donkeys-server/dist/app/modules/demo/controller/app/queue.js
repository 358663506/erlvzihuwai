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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vY29udHJvbGxlci9hcHAvcXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWlFO0FBQ2pFLDRDQUFtRTtBQUNuRSwyQ0FBaUQ7QUFDakQsK0NBQXFEO0FBRXJEOztHQUVHO0FBR0gsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxxQkFBYztJQVNuRDs7T0FFRztJQUVILEtBQUssQ0FBQyxLQUFLO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxjQUFjO1FBQ2QsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0osQ0FBQTtBQXpCRztJQURDLGtCQUFNLEVBQUU7OEJBQ00sb0JBQWE7MERBQUM7QUFJN0I7SUFEQyxrQkFBTSxFQUFFOzhCQUNRLHdCQUFlOzREQUFDO0FBTWpDO0lBREMsZ0JBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7Ozs7Z0RBSW5DO0FBTUQ7SUFEQyxlQUFHLENBQUMsU0FBUyxDQUFDOzs7O2lEQU1kO0FBM0JRLG1CQUFtQjtJQUYvQixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLG1CQUFtQixDQTRCL0I7QUE1Qlksa0RBQW1CIn0=