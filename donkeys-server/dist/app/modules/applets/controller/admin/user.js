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
exports.AppletsUserController = void 0;
/* 微信用户 */
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const user_1 = require("../../entity/user");
const user_2 = require("../../service/user");
const userRole_1 = require("../../dto/userRole");
/* 微信用户 */
let AppletsUserController = class AppletsUserController extends core_1.BaseController {
    /**
     * 修改角色
     */
    async order(user) {
        await this.appletsUserService.role(user);
        return this.ok();
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", user_2.AppletsUserService)
], AppletsUserController.prototype, "appletsUserService", void 0);
__decorate([
    decorator_1.Post('/role', { summary: '修改角色' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userRole_1.UserRoleDTO]),
    __metadata("design:returntype", Promise)
], AppletsUserController.prototype, "order", null);
AppletsUserController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['info', 'list', 'page'],
        entity: user_1.AppletsUserEntity,
        service: user_2.AppletsUserService
    })
], AppletsUserController);
exports.AppletsUserController = AppletsUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FkbWluL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBVTtBQUNWLG1EQUF1RTtBQUN2RSw0Q0FBbUU7QUFDbkUsNENBQXNEO0FBQ3RELDZDQUF3RDtBQUN4RCxpREFBaUQ7QUFFakQsVUFBVTtBQU9WLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFHckQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFZLElBQWlCO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0osQ0FBQTtBQVRHO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7aUVBQUM7QUFLdkM7SUFEQyxnQkFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN0QixXQUFBLGdCQUFJLENBQUMsZUFBRyxDQUFDLENBQUE7O3FDQUFPLHNCQUFXOztrREFHdkM7QUFWUSxxQkFBcUI7SUFOakMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUM3QixNQUFNLEVBQUUsd0JBQWlCO1FBQ3pCLE9BQU8sRUFBRSx5QkFBa0I7S0FDOUIsQ0FBQztHQUNXLHFCQUFxQixDQVdqQztBQVhZLHNEQUFxQiJ9