"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoTaskService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 任务执行的demo示例
 */
let DemoTaskService = class DemoTaskService extends core_1.BaseService {
    /**
     * 测试任务执行
     * @param params 接收的参数 数组 [] 可不传
     */
    async test(params) {
        // 需要登录后台任务管理配置任务
        console.log('任务执行了', params);
    }
};
DemoTaskService = __decorate([
    decorator_1.Provide()
], DemoTaskService);
exports.DemoTaskService = DemoTaskService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9zZXJ2aWNlL3Rhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDRDQUFnRDtBQUNoRDs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsa0JBQVc7SUFDNUM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFXO1FBQ2xCLGlCQUFpQjtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0osQ0FBQTtBQVRZLGVBQWU7SUFEM0IsbUJBQU8sRUFBRTtHQUNHLGVBQWUsQ0FTM0I7QUFUWSwwQ0FBZSJ9