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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL3BsdWdpbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RTtBQUM5RSw0Q0FBbUU7QUFDbkUsdURBQXFFO0FBRXJFOztHQUVHO0FBR0gsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxxQkFBYztJQUd4RDs7T0FFRztJQUVILEtBQUssQ0FBQyxJQUFJLENBQVMsT0FBZTtRQUM5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7O09BSUc7SUFFSCxLQUFLLENBQUMsTUFBTSxDQUFTLFNBQWlCLEVBQVUsTUFBVztRQUN2RCxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBRUgsS0FBSyxDQUFDLFNBQVMsQ0FBVSxTQUFpQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxNQUFNLENBQVMsU0FBaUIsRUFBVSxNQUFjO1FBQzFELE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNKLENBQUE7QUF2Q0c7SUFEQyxrQkFBTSxFQUFFOzhCQUNjLDRCQUFxQjt1RUFBQztBQUs3QztJQURDLGdCQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3JCLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7O29EQUVqQjtBQVFEO0lBREMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDckIsV0FBQSxnQkFBSSxFQUFFLENBQUEsRUFBcUIsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7c0RBRzlDO0FBUUQ7SUFEQyxlQUFHLENBQUMsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLFdBQUEsaUJBQUssRUFBRSxDQUFBOzs7O3lEQUV2QjtBQU9EO0lBREMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDeEIsV0FBQSxnQkFBSSxFQUFFLENBQUEsRUFBcUIsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7c0RBRzlDO0FBeENRLHdCQUF3QjtJQUZwQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLHdCQUF3QixDQXlDcEM7QUF6Q1ksNERBQXdCIn0=