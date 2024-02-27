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
exports.BaseLogSchedule = void 0;
// src/schedule/hello.ts
const decorator_1 = require("@midwayjs/decorator");
const log_1 = require("../service/sys/log");
/**
 * 日志定时任务
 */
let BaseLogSchedule = class BaseLogSchedule {
    // 定时执行的具体任务
    async exec() {
        this.logger.info('清除日志定时任务开始执行');
        const startTime = Date.now();
        await this.baseSysLogService.clear();
        this.logger.info(`清除日志定时任务结束，耗时:${Date.now() - startTime}ms`);
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", log_1.BaseSysLogService)
], BaseLogSchedule.prototype, "baseSysLogService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseLogSchedule.prototype, "logger", void 0);
BaseLogSchedule = __decorate([
    decorator_1.Provide(),
    decorator_1.Schedule({
        cron: '0 0 0 * * *',
        type: 'worker' // 指定某一个 worker 执行
    })
], BaseLogSchedule);
exports.BaseLogSchedule = BaseLogSchedule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9zY2hlZHVsZS9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsd0JBQXdCO0FBQ3hCLG1EQUFnRjtBQUNoRiw0Q0FBdUQ7QUFHdkQ7O0dBRUc7QUFNSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBT3hCLFlBQVk7SUFDWixLQUFLLENBQUMsSUFBSTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNKLENBQUE7QUFaRztJQURDLGtCQUFNLEVBQUU7OEJBQ1UsdUJBQWlCOzBEQUFDO0FBR3JDO0lBREMsa0JBQU0sRUFBRTs7K0NBQ087QUFMUCxlQUFlO0lBTDNCLG1CQUFPLEVBQUU7SUFDVCxvQkFBUSxDQUFDO1FBQ04sSUFBSSxFQUFFLGFBQWE7UUFDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0I7S0FDcEMsQ0FBQztHQUNXLGVBQWUsQ0FjM0I7QUFkWSwwQ0FBZSJ9