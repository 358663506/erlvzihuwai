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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9taWRkbGV3YXJlL3N3YWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRzlDLDRCQUE0QjtBQUU1Qjs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBQzlCLE9BQU87UUFDSCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBb0IsRUFBRSxFQUFFO1lBQ2hELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDcEIsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtnQkFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHO29CQUNsQyxhQUFhLEVBQUU7d0JBQ1gsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLEVBQUUsRUFBRSxRQUFRO3FCQUNmO2lCQUNKLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQy9DO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUE7QUFqQlkscUJBQXFCO0lBRGpDLG1CQUFPLEVBQUU7R0FDRyxxQkFBcUIsQ0FpQmpDO0FBakJZLHNEQUFxQiJ9