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
exports.BaseOpenController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const login_1 = require("../../dto/login");
const login_2 = require("../../service/sys/login");
const param_1 = require("../../service/sys/param");
/**
 * 不需要登录的后台接口
 */
let BaseOpenController = class BaseOpenController extends core_1.BaseController {
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        return this.ok(this.eps);
    }
    /**
     * 根据配置参数key获得网页内容(富文本)
     */
    async htmlByKey(key) {
        this.ctx.body = await this.baseSysParamService.htmlByKey(key);
    }
    /**
     * 登录
     * @param login
     */
    async login(login) {
        return this.ok(await this.baseSysLoginService.login(login));
    }
    /**
     * 获得验证码
     */
    async captcha(type, width, height) {
        return this.ok(await this.baseSysLoginService.captcha(type, width, height));
    }
    /**
     * 刷新token
     */
    async refreshToken(refreshToken) {
        return this.ok(await this.baseSysLoginService.refreshToken(refreshToken));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", login_2.BaseSysLoginService)
], BaseOpenController.prototype, "baseSysLoginService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseOpenController.prototype, "baseSysParamService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseOpenController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Inject('cool:eps:open'),
    __metadata("design:type", Object)
], BaseOpenController.prototype, "eps", void 0);
__decorate([
    decorator_1.Get('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "getEps", null);
__decorate([
    decorator_1.Get('/html', { summary: '获得网页内容的参数值' }),
    __param(0, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "htmlByKey", null);
__decorate([
    decorator_1.Post('/login', { summary: '登录' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "login", null);
__decorate([
    decorator_1.Get('/captcha', { summary: '验证码' }),
    __param(0, decorator_1.Query()), __param(1, decorator_1.Query()), __param(2, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "captcha", null);
__decorate([
    decorator_1.Get('/refreshToken', { summary: '刷新token' }),
    __param(0, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "refreshToken", null);
BaseOpenController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], BaseOpenController);
exports.BaseOpenController = BaseOpenController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9vcGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFtRjtBQUVuRiw0Q0FBbUU7QUFDbkUsMkNBQTJDO0FBQzNDLG1EQUE4RDtBQUM5RCxtREFBOEQ7QUFFOUQ7O0dBRUc7QUFHSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLHFCQUFjO0lBYWxEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsU0FBUyxDQUFVLEdBQVc7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7O09BR0c7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFZLEtBQWU7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxPQUFPLENBQVUsSUFBWSxFQUFXLEtBQWEsRUFBVyxNQUFjO1FBQ2hGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQVUsWUFBb0I7UUFDNUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDSixDQUFBO0FBcERHO0lBREMsa0JBQU0sRUFBRTs4QkFDWSwyQkFBbUI7K0RBQUM7QUFHekM7SUFEQyxrQkFBTSxFQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLGtCQUFNLEVBQUU7OytDQUNJO0FBR2I7SUFEQyxrQkFBTSxDQUFDLGVBQWUsQ0FBQzs7K0NBQ3BCO0FBT0o7SUFEQyxlQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzs7O2dEQUduQztBQU1EO0lBREMsZUFBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUN2QixXQUFBLGlCQUFLLEVBQUUsQ0FBQTs7OzttREFFdkI7QUFPRDtJQURDLGdCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JCLFdBQUEsZ0JBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQTs7cUNBQVEsZ0JBQVE7OytDQUVyQztBQU1EO0lBREMsZUFBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNyQixXQUFBLGlCQUFLLEVBQUUsQ0FBQSxFQUFnQixXQUFBLGlCQUFLLEVBQUUsQ0FBQSxFQUFpQixXQUFBLGlCQUFLLEVBQUUsQ0FBQTs7OztpREFFcEU7QUFNRDtJQURDLGVBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDekIsV0FBQSxpQkFBSyxFQUFFLENBQUE7Ozs7c0RBRTFCO0FBckRRLGtCQUFrQjtJQUY5QixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLGtCQUFrQixDQXNEOUI7QUF0RFksZ0RBQWtCIn0=