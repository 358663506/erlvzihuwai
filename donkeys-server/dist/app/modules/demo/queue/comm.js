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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vcXVldWUvY29tbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBcUU7QUFFckUsOENBQTBEO0FBRTFEOztHQUVHO0FBSUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLHFCQUFhO0lBSTVDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBUSxFQUFFLElBQVM7UUFDMUIsd0JBQXdCO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNKLENBQUE7QUFURztJQURDLGVBQUcsRUFBRTs7MENBQ3FCO0FBRmxCLGFBQWE7SUFIekIsYUFBSyxFQUFFO0lBQ1AsaUJBQUssQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixtQkFBTyxFQUFFO0dBQ0csYUFBYSxDQVd6QjtBQVhZLHNDQUFhIn0=