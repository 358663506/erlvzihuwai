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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL29wZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQW1GO0FBRW5GLDRDQUFtRTtBQUNuRSwyQ0FBMkM7QUFDM0MsbURBQThEO0FBQzlELG1EQUE4RDtBQUU5RDs7R0FFRztBQUdILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEscUJBQWM7SUFhbEQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxTQUFTLENBQVUsR0FBVztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxLQUFLLENBQVksS0FBZTtRQUNsQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBVSxJQUFZLEVBQVcsS0FBYSxFQUFXLE1BQWM7UUFDaEYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLFlBQVksQ0FBVSxZQUFvQjtRQUM1QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNKLENBQUE7QUFwREc7SUFEQyxrQkFBTSxFQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLGtCQUFNLEVBQUU7OEJBQ1ksMkJBQW1COytEQUFDO0FBR3pDO0lBREMsa0JBQU0sRUFBRTs7K0NBQ0k7QUFHYjtJQURDLGtCQUFNLENBQUMsZUFBZSxDQUFDOzsrQ0FDcEI7QUFPSjtJQURDLGVBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7Ozs7Z0RBR25DO0FBTUQ7SUFEQyxlQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsaUJBQUssRUFBRSxDQUFBOzs7O21EQUV2QjtBQU9EO0lBREMsZ0JBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDckIsV0FBQSxnQkFBSSxDQUFDLGVBQUcsQ0FBQyxDQUFBOztxQ0FBUSxnQkFBUTs7K0NBRXJDO0FBTUQ7SUFEQyxlQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3JCLFdBQUEsaUJBQUssRUFBRSxDQUFBLEVBQWdCLFdBQUEsaUJBQUssRUFBRSxDQUFBLEVBQWlCLFdBQUEsaUJBQUssRUFBRSxDQUFBOzs7O2lEQUVwRTtBQU1EO0lBREMsZUFBRyxDQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUN6QixXQUFBLGlCQUFLLEVBQUUsQ0FBQTs7OztzREFFMUI7QUFyRFEsa0JBQWtCO0lBRjlCLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxFQUFFO0dBQ0osa0JBQWtCLENBc0Q5QjtBQXREWSxnREFBa0IifQ==