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
exports.TaskInfoQueue = void 0;
const decorator_1 = require("@midwayjs/decorator");
const queue_1 = require("@cool-midway/queue");
const info_1 = require("../service/info");
/**
 * 任务
 */
let TaskInfoQueue = class TaskInfoQueue extends queue_1.BaseCoolQueue {
    async data(job, done) {
        try {
            const result = await this.taskInfoService.invokeService(job.data.service);
            this.taskInfoService.record(job.data, 1, JSON.stringify(result));
        }
        catch (error) {
            this.taskInfoService.record(job.data, 0, error.message);
        }
        if (!job.data.isOnce) {
            this.taskInfoService.updateNextRunTime(job.data.id);
            this.taskInfoService.updateStatus(job.data.id);
        }
        done();
    }
};
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], TaskInfoQueue.prototype, "app", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", info_1.TaskInfoService)
], TaskInfoQueue.prototype, "taskInfoService", void 0);
TaskInfoQueue = __decorate([
    queue_1.Queue(),
    decorator_1.Provide()
], TaskInfoQueue);
exports.TaskInfoQueue = TaskInfoQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rhc2svcXVldWUvdGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkQ7QUFFM0QsOENBQTBEO0FBQzFELDBDQUFrRDtBQUdsRDs7R0FFRztBQUdILElBQXNCLGFBQWEsR0FBbkMsTUFBc0IsYUFBYyxTQUFRLHFCQUFhO0lBT3ZELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBUSxFQUFFLElBQVM7UUFDNUIsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUNGLENBQUE7QUFsQkM7SUFEQyxlQUFHLEVBQUU7OzBDQUNxQjtBQUczQjtJQURDLGtCQUFNLEVBQUU7OEJBQ1Esc0JBQWU7c0RBQUM7QUFMYixhQUFhO0lBRmxDLGFBQUssRUFBRTtJQUNQLG1CQUFPLEVBQUU7R0FDWSxhQUFhLENBb0JsQztBQXBCcUIsc0NBQWEifQ==