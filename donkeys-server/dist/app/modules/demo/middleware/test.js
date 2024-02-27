"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 描述
 */
let TestMiddleware = class TestMiddleware {
    resolve() {
        return async (ctx, next) => {
            // 控制器前执行的逻辑
            const startTime = Date.now();
            // 执行下一个 Web 中间件，最后执行到控制器
            await next();
            // 控制器之后执行的逻辑
            console.log(Date.now() - startTime);
        };
    }
};
TestMiddleware = __decorate([
    decorator_1.Provide()
], TestMiddleware);
exports.TestMiddleware = TestMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vbWlkZGxld2FyZS90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUk5Qzs7R0FFRztBQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDdkIsT0FBTztRQUNILE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFvQixFQUFFLEVBQUU7WUFDaEQsWUFBWTtZQUNaLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3Qix5QkFBeUI7WUFDekIsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNiLGFBQWE7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQVhZLGNBQWM7SUFEMUIsbUJBQU8sRUFBRTtHQUNHLGNBQWMsQ0FXMUI7QUFYWSx3Q0FBYyJ9