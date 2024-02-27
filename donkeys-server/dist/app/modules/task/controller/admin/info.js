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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rhc2svY29udHJvbGxlci9hZG1pbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQVE2QjtBQUM3Qiw0Q0FBbUU7QUFDbkUsNENBQW1EO0FBQ25ELDZDQUFxRDtBQUVyRDs7R0FFRztBQWFILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEscUJBQWM7SUFJcEQ7O09BRUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFTLEVBQVU7UUFDM0IsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFTLEVBQVU7UUFDM0IsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFTLEVBQVUsRUFBVSxJQUFZO1FBQ2xELE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxHQUFHLENBQWEsTUFBVztRQUMvQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRixDQUFBO0FBcENDO0lBREMsa0JBQU0sRUFBRTs4QkFDUSxzQkFBZTsyREFBQztBQU1qQztJQURDLGdCQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7OzhDQUdqQjtBQU1EO0lBREMsZ0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDckIsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7OENBR2pCO0FBTUQ7SUFEQyxnQkFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyQixXQUFBLGdCQUFJLEVBQUUsQ0FBQSxFQUFjLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7OytDQUd0QztBQU1EO0lBREMsZUFBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNwQixXQUFBLGlCQUFLLENBQUMsZUFBRyxDQUFDLENBQUE7Ozs7NkNBRXBCO0FBckNVLGtCQUFrQjtJQVo5QixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDaEQsTUFBTSxFQUFFLHFCQUFjO1FBQ3RCLE9BQU8sRUFBRSxzQkFBZTtRQUN4QixNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDWixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hELENBQUM7UUFDRCxXQUFXLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1NBQzVCO0tBQ0YsQ0FBQztHQUNXLGtCQUFrQixDQXNDOUI7QUF0Q1ksZ0RBQWtCIn0=