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
exports.TaskDemoService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 描述
 */
let TaskDemoService = class TaskDemoService extends core_1.BaseService {
    /**
     * 描述
     */
    async test() {
        // this.logger.info('我被调用了');
        console.log('\nhello: 我被调用了 \n');
        return '任务执行成功';
    }
    /**
     * hello
     */
    async helloWord() {
        this.logger.info('helloWord');
        console.log('hello');
        return '任务执行成功';
    }
    async helloWord2() {
        this.logger.info('helloWord2');
        console.log('hello');
        return '任务执行成功';
    }
};
__decorate([
    decorator_1.Logger(),
    __metadata("design:type", Object)
], TaskDemoService.prototype, "logger", void 0);
TaskDemoService = __decorate([
    decorator_1.Provide()
], TaskDemoService);
exports.TaskDemoService = TaskDemoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rhc2svc2VydmljZS9kZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFHaEQ7O0dBRUc7QUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLGtCQUFXO0lBRzVDOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDTiw2QkFBNkI7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFDRDs7T0FFRztJQUNILEtBQUssQ0FBQyxTQUFTO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7Q0FDSixDQUFBO0FBdkJHO0lBREMsa0JBQU0sRUFBRTs7K0NBQ087QUFGUCxlQUFlO0lBRDNCLG1CQUFPLEVBQUU7R0FDRyxlQUFlLENBeUIzQjtBQXpCWSwwQ0FBZSJ9