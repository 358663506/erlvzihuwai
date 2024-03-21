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
exports.TaskInfoController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const info_1 = require("../../entity/info");
const info_2 = require("../../service/info");
/**
 * 任务
 */
let TaskInfoController = class TaskInfoController extends core_1.BaseController {
    /**
     * 手动执行一次
     */
    async once(id) {
        await this.taskInfoService.once(id);
        this.ok();
    }
    /**
     * 暂停任务
     */
    async stop(id) {
        await this.taskInfoService.stop(id);
        this.ok();
    }
    /**
     * 开始任务
     */
    async start(id, type) {
        await this.taskInfoService.start(id, type);
        this.ok();
    }
    /**
     * 日志
     */
    async log(params) {
        return this.ok(await this.taskInfoService.log(params));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", info_2.TaskInfoService)
], TaskInfoController.prototype, "taskInfoService", void 0);
__decorate([
    decorator_1.Post('/once', { summary: '执行一次' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "once", null);
__decorate([
    decorator_1.Post('/stop', { summary: '停止' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "stop", null);
__decorate([
    decorator_1.Post('/start', { summary: '开始' }),
    __param(0, decorator_1.Body()), __param(1, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "start", null);
__decorate([
    decorator_1.Get('/log', { summary: '日志' }),
    __param(0, decorator_1.Query(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "log", null);
TaskInfoController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'page'],
        entity: info_1.TaskInfoEntity,
        service: info_2.TaskInfoService,
        before: ctx => {
            ctx.request.body.limit = ctx.request.body.repeatCount;
        },
        pageQueryOp: {
            fieldEq: ['status', 'type'],
        },
    })
], TaskInfoController);
exports.TaskInfoController = TaskInfoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvdGFzay9jb250cm9sbGVyL2FkbWluL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBUTZCO0FBQzdCLDRDQUFtRTtBQUNuRSw0Q0FBbUQ7QUFDbkQsNkNBQXFEO0FBRXJEOztHQUVHO0FBYUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxxQkFBYztJQUlwRDs7T0FFRztJQUVILEtBQUssQ0FBQyxJQUFJLENBQVMsRUFBVTtRQUMzQixNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxJQUFJLENBQVMsRUFBVTtRQUMzQixNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxLQUFLLENBQVMsRUFBVSxFQUFVLElBQVk7UUFDbEQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLEdBQUcsQ0FBYSxNQUFXO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGLENBQUE7QUFwQ0M7SUFEQyxrQkFBTSxFQUFFOzhCQUNRLHNCQUFlOzJEQUFDO0FBTWpDO0lBREMsZ0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdkIsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7OENBR2pCO0FBTUQ7SUFEQyxnQkFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyQixXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7Ozs4Q0FHakI7QUFNRDtJQURDLGdCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JCLFdBQUEsZ0JBQUksRUFBRSxDQUFBLEVBQWMsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7K0NBR3RDO0FBTUQ7SUFEQyxlQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BCLFdBQUEsaUJBQUssQ0FBQyxlQUFHLENBQUMsQ0FBQTs7Ozs2Q0FFcEI7QUFyQ1Usa0JBQWtCO0lBWjlCLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNoRCxNQUFNLEVBQUUscUJBQWM7UUFDdEIsT0FBTyxFQUFFLHNCQUFlO1FBQ3hCLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNaLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEQsQ0FBQztRQUNELFdBQVcsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7U0FDNUI7S0FDRixDQUFDO0dBQ1csa0JBQWtCLENBc0M5QjtBQXRDWSxnREFBa0IifQ==