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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3BsdWdpbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBd0U7QUFFeEU7O0dBRUc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGtCQUFXO0lBT2xEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQWlCLEVBQUUsTUFBTTtRQUNsQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFpQjtRQUM3QixPQUFPLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQWlCLEVBQUUsTUFBYztRQUMxQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0osQ0FBQTtBQW5DRztJQURDLGtCQUFNLENBQUMsaUJBQWlCLENBQUM7OEJBQ2QsaUJBQVU7eURBQUM7QUFHdkI7SUFEQyxrQkFBTSxDQUFDLFlBQVksQ0FBQzs7d0RBQ0M7QUFMYixxQkFBcUI7SUFEakMsbUJBQU8sRUFBRTtHQUNHLHFCQUFxQixDQXFDakM7QUFyQ1ksc0RBQXFCIn0=