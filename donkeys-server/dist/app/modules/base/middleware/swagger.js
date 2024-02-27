"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSwaggerMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const _ = require("lodash");
/**
 * swagger
 */
let BaseSwaggerMiddleware = class BaseSwaggerMiddleware {
    resolve() {
        return async (ctx, next) => {
            const { url } = ctx;
            await next();
            if (_.startsWith(url, '/swagger-ui/json')) {
                ctx.body.components.securitySchemes = {
                    Authorization: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'header'
                    }
                };
                ctx.body.security = [{ Authorization: [] }];
            }
        };
    }
};
BaseSwaggerMiddleware = __decorate([
    decorator_1.Provide()
], BaseSwaggerMiddleware);
exports.BaseSwaggerMiddleware = BaseSwaggerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2UvbWlkZGxld2FyZS9zd2FnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUc5Qyw0QkFBNEI7QUFFNUI7O0dBRUc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUM5QixPQUFPO1FBQ0gsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQW9CLEVBQUUsRUFBRTtZQUNoRCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRztvQkFDbEMsYUFBYSxFQUFFO3dCQUNYLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxlQUFlO3dCQUNyQixFQUFFLEVBQUUsUUFBUTtxQkFDZjtpQkFDSixDQUFDO2dCQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBakJZLHFCQUFxQjtJQURqQyxtQkFBTyxFQUFFO0dBQ0cscUJBQXFCLENBaUJqQztBQWpCWSxzREFBcUIifQ==