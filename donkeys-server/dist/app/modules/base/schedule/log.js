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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9iYXNlL3NjaGVkdWxlL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx3QkFBd0I7QUFDeEIsbURBQWdGO0FBQ2hGLDRDQUF1RDtBQUd2RDs7R0FFRztBQU1ILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFPeEIsWUFBWTtJQUNaLEtBQUssQ0FBQyxJQUFJO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQ0osQ0FBQTtBQVpHO0lBREMsa0JBQU0sRUFBRTs4QkFDVSx1QkFBaUI7MERBQUM7QUFHckM7SUFEQyxrQkFBTSxFQUFFOzsrQ0FDTztBQUxQLGVBQWU7SUFMM0IsbUJBQU8sRUFBRTtJQUNULG9CQUFRLENBQUM7UUFDTixJQUFJLEVBQUUsYUFBYTtRQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLGtCQUFrQjtLQUNwQyxDQUFDO0dBQ1csZUFBZSxDQWMzQjtBQWRZLDBDQUFlIn0=