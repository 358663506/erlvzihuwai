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
exports.BaseLogMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const log_1 = require("../service/sys/log");
/**
 * 日志中间件
 */
let BaseLogMiddleware = class BaseLogMiddleware {
    resolve() {
        return async (ctx, next) => {
            this.baseSysLogService.record(ctx, ctx.url.split('?')[0], ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.admin ? ctx.admin.userId : null);
            await next();
        };
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", log_1.BaseSysLogService)
], BaseLogMiddleware.prototype, "baseSysLogService", void 0);
BaseLogMiddleware = __decorate([
    decorator_1.Provide()
], BaseLogMiddleware);
exports.BaseLogMiddleware = BaseLogMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9taWRkbGV3YXJlL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFFdEQsNENBQXVEO0FBR3ZEOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFJMUIsT0FBTztRQUNILE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFvQixFQUFFLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hLLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUE7QUFSRztJQURDLGtCQUFNLEVBQUU7OEJBQ1UsdUJBQWlCOzREQUFDO0FBRjVCLGlCQUFpQjtJQUQ3QixtQkFBTyxFQUFFO0dBQ0csaUJBQWlCLENBVTdCO0FBVlksOENBQWlCIn0=