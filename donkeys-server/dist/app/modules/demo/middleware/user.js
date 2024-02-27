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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vbWlkZGxld2FyZS91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLG1EQUFtRDtBQUluRDs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBSTNCLE9BQU87UUFDSCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBb0IsRUFBRSxFQUFFO1lBQ2hELHlDQUF5QztZQUN6QyxNQUFNLE1BQU0sR0FBZ0IsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLFlBQVk7WUFDWixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDN0IseUJBQXlCO1lBQ3pCLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDYixhQUFhO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUE7QUFmRztJQURDLGVBQUcsRUFBRTs7K0NBQ3FCO0FBRmxCLGtCQUFrQjtJQUQ5QixtQkFBTyxFQUFFO0dBQ0csa0JBQWtCLENBaUI5QjtBQWpCWSxnREFBa0IifQ==