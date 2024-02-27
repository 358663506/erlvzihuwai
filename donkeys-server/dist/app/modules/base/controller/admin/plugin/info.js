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
exports.BasePluginInfoController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const info_1 = require("../../../service/plugin/info");
/**
 * 插件
 */
let BasePluginInfoController = class BasePluginInfoController extends core_1.BaseController {
    /**
     * 插件列表
     */
    async list(keyWord) {
        return this.ok(await this.basePluginInfoService.list(keyWord));
    }
    /**
     * 配置
     * @param namespace
     * @param config
     */
    async config(namespace, config) {
        await this.basePluginInfoService.config(namespace, config);
        return this.ok();
    }
    /**
     * 配置
     * @param namespace
     * @param config
     */
    async getConfig(namespace) {
        return this.ok(await this.basePluginInfoService.getConfig(namespace));
    }
    /**
     * 启用插件
     * @param enable
     */
    async enable(namespace, enable) {
        await this.basePluginInfoService.enable(namespace, enable);
        return this.ok();
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", info_1.BasePluginInfoService)
], BasePluginInfoController.prototype, "basePluginInfoService", void 0);
__decorate([
    decorator_1.Post('/list', { summary: '列表' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasePluginInfoController.prototype, "list", null);
__decorate([
    decorator_1.Post('/config', { summary: '配置' }),
    __param(0, decorator_1.Body()), __param(1, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BasePluginInfoController.prototype, "config", null);
__decorate([
    decorator_1.Get('/getConfig', { summary: '获得配置' }),
    __param(0, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasePluginInfoController.prototype, "getConfig", null);
__decorate([
    decorator_1.Post('/enable', { summary: '启用|禁用' }),
    __param(0, decorator_1.Body()), __param(1, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BasePluginInfoController.prototype, "enable", null);
BasePluginInfoController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], BasePluginInfoController);
exports.BasePluginInfoController = BasePluginInfoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9wbHVnaW4vaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEU7QUFDOUUsNENBQW1FO0FBQ25FLHVEQUFxRTtBQUVyRTs7R0FFRztBQUdILElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEscUJBQWM7SUFHeEQ7O09BRUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFTLE9BQWU7UUFDOUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsS0FBSyxDQUFDLE1BQU0sQ0FBUyxTQUFpQixFQUFVLE1BQVc7UUFDdkQsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUVILEtBQUssQ0FBQyxTQUFTLENBQVUsU0FBaUI7UUFDdEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7O09BR0c7SUFFSCxLQUFLLENBQUMsTUFBTSxDQUFTLFNBQWlCLEVBQVUsTUFBYztRQUMxRCxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDSixDQUFBO0FBdkNHO0lBREMsa0JBQU0sRUFBRTs4QkFDYyw0QkFBcUI7dUVBQUM7QUFLN0M7SUFEQyxnQkFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyQixXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7OztvREFFakI7QUFRRDtJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JCLFdBQUEsZ0JBQUksRUFBRSxDQUFBLEVBQXFCLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7O3NEQUc5QztBQVFEO0lBREMsZUFBRyxDQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN0QixXQUFBLGlCQUFLLEVBQUUsQ0FBQTs7Ozt5REFFdkI7QUFPRDtJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLFdBQUEsZ0JBQUksRUFBRSxDQUFBLEVBQXFCLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7O3NEQUc5QztBQXhDUSx3QkFBd0I7SUFGcEMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLEVBQUU7R0FDSix3QkFBd0IsQ0F5Q3BDO0FBekNZLDREQUF3QiJ9