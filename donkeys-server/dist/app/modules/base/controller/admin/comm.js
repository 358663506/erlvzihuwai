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
exports.BaseCommController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const user_1 = require("../../entity/sys/user");
const login_1 = require("../../service/sys/login");
const perms_1 = require("../../service/sys/perms");
const user_2 = require("../../service/sys/user");
/**
 * Base 通用接口 一般写不需要权限过滤的接口
 */
let BaseCommController = class BaseCommController extends core_1.BaseController {
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        return this.ok(this.eps);
    }
    /**
     * 获得个人信息
     */
    async person() {
        return this.ok(await this.baseSysUserService.person());
    }
    /**
     * 修改个人信息
     */
    async personUpdate(user) {
        await this.baseSysUserService.personUpdate(user);
        return this.ok();
    }
    /**
     * 权限菜单
     */
    async permmenu() {
        return this.ok(await this.baseSysPermsService.permmenu(this.ctx.admin.roleIds));
    }
    /**
     * 文件上传
     */
    async upload() {
        return this.ok(await this.coolFile.upload(this.ctx));
    }
    /**
     * 文件上传模式，本地或者云存储
     */
    async uploadMode() {
        return this.ok(this.coolFile.getMode());
    }
    /**
     * 退出
     */
    async logout() {
        await this.baseSysLoginService.logout();
        return this.ok();
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", user_2.BaseSysUserService)
], BaseCommController.prototype, "baseSysUserService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseCommController.prototype, "baseSysPermsService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", login_1.BaseSysLoginService)
], BaseCommController.prototype, "baseSysLoginService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseCommController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Inject('cool:file'),
    __metadata("design:type", Object)
], BaseCommController.prototype, "coolFile", void 0);
__decorate([
    decorator_1.Inject('cool:eps:admin'),
    __metadata("design:type", Object)
], BaseCommController.prototype, "eps", void 0);
__decorate([
    decorator_1.Get('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "getEps", null);
__decorate([
    decorator_1.Get('/person', { summary: '个人信息' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "person", null);
__decorate([
    decorator_1.Post('/personUpdate', { summary: '修改个人信息' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.BaseSysUserEntity]),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "personUpdate", null);
__decorate([
    decorator_1.Get('/permmenu', { summary: '权限与菜单' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "permmenu", null);
__decorate([
    decorator_1.Post('/upload', { summary: '文件上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "upload", null);
__decorate([
    decorator_1.Get('/uploadMode', { summary: '文件上传模式' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "uploadMode", null);
__decorate([
    decorator_1.Post('/logout', { summary: '退出' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseCommController.prototype, "logout", null);
BaseCommController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], BaseCommController);
exports.BaseCommController = BaseCommController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL2NvbW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTRFO0FBRTVFLDRDQUE4RTtBQUM5RSxnREFBMEQ7QUFDMUQsbURBQThEO0FBQzlELG1EQUE4RDtBQUM5RCxpREFBNEQ7QUFFNUQ7O0dBRUc7QUFHSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLHFCQUFjO0lBbUJsRDs7O09BR0c7SUFFSSxLQUFLLENBQUMsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsWUFBWSxDQUFZLElBQXVCO1FBQ2pELE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDSixDQUFBO0FBM0VHO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7OERBQUM7QUFHdkM7SUFEQyxrQkFBTSxFQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLGtCQUFNLEVBQUU7OEJBQ1ksMkJBQW1COytEQUFDO0FBR3pDO0lBREMsa0JBQU0sRUFBRTs7K0NBQ0k7QUFHYjtJQURDLGtCQUFNLENBQUMsV0FBVyxDQUFDOztvREFDQTtBQUdwQjtJQURDLGtCQUFNLENBQUMsZ0JBQWdCLENBQUM7OytDQUNyQjtBQU9KO0lBREMsZUFBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzs7OztnREFHbkM7QUFNRDtJQURDLGVBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7Z0RBR25DO0FBTUQ7SUFEQyxnQkFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUN6QixXQUFBLGdCQUFJLENBQUMsZUFBRyxDQUFDLENBQUE7O3FDQUFPLHdCQUFpQjs7c0RBR3BEO0FBTUQ7SUFEQyxlQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOzs7O2tEQUd0QztBQU1EO0lBREMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7Z0RBR3BDO0FBTUQ7SUFEQyxlQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzs7O29EQUd6QztBQU1EO0lBREMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7Ozs7Z0RBSWxDO0FBNUVRLGtCQUFrQjtJQUY5QixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLGtCQUFrQixDQTZFOUI7QUE3RVksZ0RBQWtCIn0=