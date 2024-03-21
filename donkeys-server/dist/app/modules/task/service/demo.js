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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvdGFzay9zZXJ2aWNlL2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFnRDtBQUdoRDs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsa0JBQVc7SUFHNUM7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSTtRQUNOLDZCQUE2QjtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFNBQVM7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVTtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztDQUNKLENBQUE7QUF2Qkc7SUFEQyxrQkFBTSxFQUFFOzsrQ0FDTztBQUZQLGVBQWU7SUFEM0IsbUJBQU8sRUFBRTtHQUNHLGVBQWUsQ0F5QjNCO0FBekJZLDBDQUFlIn0=