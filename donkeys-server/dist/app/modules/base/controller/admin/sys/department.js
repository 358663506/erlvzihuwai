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
exports.BaseDepartmentController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const department_1 = require("../../../entity/sys/department");
const department_2 = require("../../../service/sys/department");
/**
 * 部门
 */
let BaseDepartmentController = class BaseDepartmentController extends core_1.BaseController {
    /**
     * 部门排序
     */
    async order(params) {
        await this.baseDepartmentService.order(params);
        return this.ok();
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", department_2.BaseSysDepartmentService)
], BaseDepartmentController.prototype, "baseDepartmentService", void 0);
__decorate([
    decorator_1.Post('/order', { summary: '排序' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseDepartmentController.prototype, "order", null);
BaseDepartmentController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'list'],
        entity: department_1.BaseSysDepartmentEntity,
        service: department_2.BaseSysDepartmentService
    })
], BaseDepartmentController);
exports.BaseDepartmentController = BaseDepartmentController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL3N5cy9kZXBhcnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUF1RTtBQUN2RSw0Q0FBbUU7QUFDbkUsK0RBQXlFO0FBQ3pFLGdFQUEyRTtBQUUzRTs7R0FFRztBQU9ILElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEscUJBQWM7SUFJeEQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFZLE1BQVc7UUFDOUIsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDSixDQUFBO0FBVkc7SUFEQyxrQkFBTSxFQUFFOzhCQUNjLHFDQUF3Qjt1RUFBQztBQU1oRDtJQURDLGdCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JCLFdBQUEsZ0JBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQTs7OztxREFHckI7QUFYUSx3QkFBd0I7SUFOcEMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDeEMsTUFBTSxFQUFFLG9DQUF1QjtRQUMvQixPQUFPLEVBQUUscUNBQXdCO0tBQ3BDLENBQUM7R0FDVyx3QkFBd0IsQ0FZcEM7QUFaWSw0REFBd0IifQ==