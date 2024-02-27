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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9hZG1pbi91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFVBQVU7QUFDVixtREFBdUU7QUFDdkUsNENBQW1FO0FBQ25FLDRDQUFzRDtBQUN0RCw2Q0FBd0Q7QUFDeEQsaURBQWlEO0FBRWpELFVBQVU7QUFPVixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBR3JEOztPQUVHO0lBRUgsS0FBSyxDQUFDLEtBQUssQ0FBWSxJQUFpQjtRQUNwQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNKLENBQUE7QUFURztJQURDLGtCQUFNLEVBQUU7OEJBQ1cseUJBQWtCO2lFQUFDO0FBS3ZDO0lBREMsZ0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdEIsV0FBQSxnQkFBSSxDQUFDLGVBQUcsQ0FBQyxDQUFBOztxQ0FBTyxzQkFBVzs7a0RBR3ZDO0FBVlEscUJBQXFCO0lBTmpDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ1osR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDN0IsTUFBTSxFQUFFLHdCQUFpQjtRQUN6QixPQUFPLEVBQUUseUJBQWtCO0tBQzlCLENBQUM7R0FDVyxxQkFBcUIsQ0FXakM7QUFYWSxzREFBcUIifQ==