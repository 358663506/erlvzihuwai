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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePluginInfoService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 插件
 */
let BasePluginInfoService = class BasePluginInfoService extends core_1.BaseService {
    /**
     * 列表
     */
    async list(keyWord) {
        return this.coolPlugin.list(keyWord);
    }
    /**
     * 配置
     */
    async config(namespace, config) {
        await this.coolPlugin.setConfig(namespace, config);
    }
    /**
     * 获得配置信息
     * @param namespace
     */
    async getConfig(namespace) {
        return await this.coolPlugin.getConfig(namespace);
    }
    /**
     * 是否启用插件
     * @param namespace
     * @param enable
     */
    async enable(namespace, enable) {
        await this.coolPlugin.enable(namespace, enable);
    }
};
__decorate([
    decorator_1.Inject('cool:coolPlugin'),
    __metadata("design:type", core_1.CoolPlugin)
], BasePluginInfoService.prototype, "coolPlugin", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], BasePluginInfoService.prototype, "coolCache", void 0);
BasePluginInfoService = __decorate([
    decorator_1.Provide()
], BasePluginInfoService);
exports.BasePluginInfoService = BasePluginInfoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2Uvc2VydmljZS9wbHVnaW4vaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQXdFO0FBRXhFOztHQUVHO0FBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxrQkFBVztJQU9sRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFpQixFQUFFLE1BQU07UUFDbEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBaUI7UUFDN0IsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFpQixFQUFFLE1BQWM7UUFDMUMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNKLENBQUE7QUFuQ0c7SUFEQyxrQkFBTSxDQUFDLGlCQUFpQixDQUFDOzhCQUNkLGlCQUFVO3lEQUFDO0FBR3ZCO0lBREMsa0JBQU0sQ0FBQyxZQUFZLENBQUM7O3dEQUNDO0FBTGIscUJBQXFCO0lBRGpDLG1CQUFPLEVBQUU7R0FDRyxxQkFBcUIsQ0FxQ2pDO0FBckNZLHNEQUFxQiJ9