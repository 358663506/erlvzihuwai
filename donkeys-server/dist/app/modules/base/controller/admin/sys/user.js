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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL3N5cy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBbUU7QUFDbkUsbURBQTZEO0FBQzdELG9EQUErRDtBQUUvRDs7R0FFRztBQU9ILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFJckQ7O09BRUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFTLFlBQW9CLEVBQVUsT0FBVztRQUN4RCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDSixDQUFBO0FBVkc7SUFEQyxrQkFBTSxFQUFFOzhCQUNXLHlCQUFrQjtpRUFBQztBQU12QztJQURDLGdCQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsZ0JBQUksRUFBRSxDQUFBLEVBQXdCLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7O2lEQUcvQztBQVhRLHFCQUFxQjtJQU5qQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx3QkFBaUI7UUFDekIsT0FBTyxFQUFFLHlCQUFrQjtLQUM5QixDQUFDO0dBQ1cscUJBQXFCLENBWWpDO0FBWlksc0RBQXFCIn0=