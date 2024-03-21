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
exports.DemoCommQueue = void 0;
const decorator_1 = require("@midwayjs/decorator");
const queue_1 = require("@cool-midway/queue");
/**
 * 普通队列
 */
let DemoCommQueue = class DemoCommQueue extends queue_1.BaseCoolQueue {
    async data(job, done) {
        // 这边可以执行定时任务具体的业务或队列的业务
        console.log('数据', job.data);
        // 抛出错误 可以让队列重试，默认重试5次
        //throw new Error('错误');
        done();
    }
};
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], DemoCommQueue.prototype, "app", void 0);
DemoCommQueue = __decorate([
    queue_1.Queue(),
    decorator_1.Scope(decorator_1.ScopeEnum.Singleton),
    decorator_1.Provide()
], DemoCommQueue);
exports.DemoCommQueue = DemoCommQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9xdWV1ZS9jb21tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRTtBQUVyRSw4Q0FBMEQ7QUFFMUQ7O0dBRUc7QUFJSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEscUJBQWE7SUFJNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFRLEVBQUUsSUFBUztRQUMxQix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0osQ0FBQTtBQVRHO0lBREMsZUFBRyxFQUFFOzswQ0FDcUI7QUFGbEIsYUFBYTtJQUh6QixhQUFLLEVBQUU7SUFDUCxpQkFBSyxDQUFDLHFCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLG1CQUFPLEVBQUU7R0FDRyxhQUFhLENBV3pCO0FBWFksc0NBQWEifQ==