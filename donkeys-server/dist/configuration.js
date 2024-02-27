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
exports.ContainerLifeCycle = void 0;
const decorator_1 = require("@midwayjs/decorator");
const egg_1 = require("egg");
const view = require("@midwayjs/view-nunjucks");
const orm = require("@midwayjs/orm");
const cool = require("@cool-midway/core");
const swagger = require("@midwayjs/swagger");
// import * as wxpay from '@cool-midway/wxpay';
const oss = require("@cool-midway/oss");
const qiniu = require("@cool-midway/qiniu");
const redis = require("@cool-midway/redis");
const queue = require("@cool-midway/queue");
// import * as alipay from '@cool-midway/alipay';
const socket = require("@cool-midway/socket");
let ContainerLifeCycle = class ContainerLifeCycle {
    // 应用启动完成
    async onReady(container) { }
    // 应用停止
    async onStop() { }
};
__decorate([
    decorator_1.App(),
    __metadata("design:type", egg_1.Application)
], ContainerLifeCycle.prototype, "app", void 0);
ContainerLifeCycle = __decorate([
    decorator_1.Configuration({
        // 注意组件顺序 cool 有依赖orm组件， 所以必须放在，orm组件之后 cool的其他组件必须放在cool 核心组件之后
        imports: [
            // 模板渲染
            view,
            // 必须，不可移除， https://typeorm.io  打不开？ https://typeorm.biunav.com/zh/
            orm,
            // swagger文档 访问地址 http://127.0.0.1:8001/swagger-ui/index.html
            {
                component: swagger,
                enabledEnvironment: ['local']
            },
            // 必须，不可移除， cool-admin 官方组件 https://www.cool-js.com
            cool,
            // oss插件，需要到后台配置之后才有用，默认是本地上传
            oss,
            // 七牛云插件，需要到后台配置之后才有用，默认是本地上传
            qiniu,
            // 将缓存替换成redis
            redis,
            // // 队列
            queue,
            // // 微信支付
            // wxpay,
            // // 支付宝支付
            // alipay,
            // socket
            socket
        ]
    })
], ContainerLifeCycle);
exports.ContainerLifeCycle = ContainerLifeCycle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXlEO0FBRXpELDZCQUFrQztBQUNsQyxnREFBZ0Q7QUFDaEQscUNBQXFDO0FBQ3JDLDBDQUEwQztBQUMxQyw2Q0FBNkM7QUFDN0MsK0NBQStDO0FBQy9DLHdDQUF3QztBQUN4Qyw0Q0FBNEM7QUFDNUMsNENBQTRDO0FBQzVDLDRDQUE0QztBQUM1QyxpREFBaUQ7QUFDakQsOENBQThDO0FBZ0M5QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUczQixTQUFTO0lBQ1QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUE0QixJQUFHLENBQUM7SUFDOUMsT0FBTztJQUNQLEtBQUssQ0FBQyxNQUFNLEtBQUksQ0FBQztDQUNwQixDQUFBO0FBTEc7SUFEQyxlQUFHLEVBQUU7OEJBQ0QsaUJBQVc7K0NBQUM7QUFGUixrQkFBa0I7SUE5QjlCLHlCQUFhLENBQUM7UUFDWCxnRUFBZ0U7UUFDaEUsT0FBTyxFQUFFO1lBQ0wsT0FBTztZQUNQLElBQUk7WUFDSixtRUFBbUU7WUFDbkUsR0FBRztZQUNILDZEQUE2RDtZQUM3RDtnQkFDSSxTQUFTLEVBQUUsT0FBTztnQkFDbEIsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDaEM7WUFDRCxtREFBbUQ7WUFDbkQsSUFBSTtZQUNKLDZCQUE2QjtZQUM3QixHQUFHO1lBQ0gsNkJBQTZCO1lBQzdCLEtBQUs7WUFDTCxjQUFjO1lBQ2QsS0FBSztZQUNMLFFBQVE7WUFDUixLQUFLO1lBQ0wsVUFBVTtZQUNWLFNBQVM7WUFDVCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFNBQVM7WUFDVCxNQUFNO1NBQ1Q7S0FDSixDQUFDO0dBQ1csa0JBQWtCLENBTzlCO0FBUFksZ0RBQWtCIn0=