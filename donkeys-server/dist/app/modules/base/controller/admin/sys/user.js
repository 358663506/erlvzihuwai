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
exports.BaseSysUserController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const user_1 = require("../../../entity/sys/user");
const user_2 = require("../../../service/sys/user");
/**
 * 系统用户
 */
let BaseSysUserController = class BaseSysUserController extends core_1.BaseController {
    /**
     * 移动部门
     */
    async move(departmentId, userIds) {
        await this.baseSysUserService.move(departmentId, userIds);
        return this.ok();
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", user_2.BaseSysUserService)
], BaseSysUserController.prototype, "baseSysUserService", void 0);
__decorate([
    decorator_1.Post('/move', { summary: '移动部门' }),
    __param(0, decorator_1.Body()), __param(1, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], BaseSysUserController.prototype, "move", null);
BaseSysUserController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: user_1.BaseSysUserEntity,
        service: user_2.BaseSysUserService
    })
], BaseSysUserController);
exports.BaseSysUserController = BaseSysUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9zeXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLG1EQUE2RDtBQUM3RCxvREFBK0Q7QUFFL0Q7O0dBRUc7QUFPSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBSXJEOztPQUVHO0lBRUgsS0FBSyxDQUFDLElBQUksQ0FBUyxZQUFvQixFQUFVLE9BQVc7UUFDeEQsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0osQ0FBQTtBQVZHO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7aUVBQUM7QUFNdkM7SUFEQyxnQkFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN2QixXQUFBLGdCQUFJLEVBQUUsQ0FBQSxFQUF3QixXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7OztpREFHL0M7QUFYUSxxQkFBcUI7SUFOakMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUsd0JBQWlCO1FBQ3pCLE9BQU8sRUFBRSx5QkFBa0I7S0FDOUIsQ0FBQztHQUNXLHFCQUFxQixDQVlqQztBQVpZLHNEQUFxQiJ9