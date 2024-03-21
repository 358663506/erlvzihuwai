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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9taWRkbGV3YXJlL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBSTlDOztHQUVHO0FBRUgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN2QixPQUFPO1FBQ0gsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQW9CLEVBQUUsRUFBRTtZQUNoRCxZQUFZO1lBQ1osTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzdCLHlCQUF5QjtZQUN6QixNQUFNLElBQUksRUFBRSxDQUFDO1lBQ2IsYUFBYTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBWFksY0FBYztJQUQxQixtQkFBTyxFQUFFO0dBQ0csY0FBYyxDQVcxQjtBQVhZLHdDQUFjIn0=