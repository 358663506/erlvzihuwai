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
exports.DemoUserMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 描述
 */
let DemoUserMiddleware = class DemoUserMiddleware {
    resolve() {
        return async (ctx, next) => {
            // 获得请求路径标签，可以利用此处来判断是否忽略token校验，以及其他需求场景
            const urlTag = await this.app.getApplicationContext().getAsync('cool:urlTag');
            console.log('urlTag', urlTag);
            // 控制器前执行的逻辑
            const startTime = Date.now();
            // 执行下一个 Web 中间件，最后执行到控制器
            await next();
            // 控制器之后执行的逻辑
            console.log(Date.now() - startTime);
        };
    }
};
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], DemoUserMiddleware.prototype, "app", void 0);
DemoUserMiddleware = __decorate([
    decorator_1.Provide()
], DemoUserMiddleware);
exports.DemoUserMiddleware = DemoUserMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9taWRkbGV3YXJlL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsbURBQW1EO0FBSW5EOztHQUVHO0FBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFJM0IsT0FBTztRQUNILE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFvQixFQUFFLEVBQUU7WUFDaEQseUNBQXlDO1lBQ3pDLE1BQU0sTUFBTSxHQUFnQixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUIsWUFBWTtZQUNaLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3Qix5QkFBeUI7WUFDekIsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNiLGFBQWE7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQWZHO0lBREMsZUFBRyxFQUFFOzsrQ0FDcUI7QUFGbEIsa0JBQWtCO0lBRDlCLG1CQUFPLEVBQUU7R0FDRyxrQkFBa0IsQ0FpQjlCO0FBakJZLGdEQUFrQiJ9