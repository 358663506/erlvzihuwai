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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSwaggerController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const swagger_1 = require("@midwayjs/swagger");
/**
 * swagger
 */
let DemoSwaggerController = class DemoSwaggerController extends core_1.BaseController {
    async hello(name, age, desc) {
        return this.ok(`你好：${name}!! ${age} ${desc}`);
    }
};
__decorate([
    swagger_1.CreateApiDoc()
        .summary('hello 接口')
        .description('hello 接口功能描述')
        .param('姓名', { required: true })
        .param('年龄', { required: true })
        .param('简介', { required: false })
        .build(),
    decorator_1.Get('/hello'),
    __param(0, decorator_1.Query()), __param(1, decorator_1.Query()), __param(2, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], DemoSwaggerController.prototype, "hello", null);
DemoSwaggerController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController(null, {
        tagName: 'swagger 文档',
        description: 'swagger 文档演示'
    })
], DemoSwaggerController);
exports.DemoSwaggerController = DemoSwaggerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9jb250cm9sbGVyL2FwcC9zd2FnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUEwRDtBQUMxRCw0Q0FBbUU7QUFDbkUsK0NBQWlEO0FBRWpEOztHQUVHO0FBTUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxxQkFBYztJQVNyRCxLQUFLLENBQUMsS0FBSyxDQUFVLElBQVksRUFBVyxHQUFXLEVBQVcsSUFBWTtRQUMxRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNKLENBQUE7QUFIRztJQVJDLHNCQUFZLEVBQUU7U0FDVixPQUFPLENBQUMsVUFBVSxDQUFDO1NBQ25CLFdBQVcsQ0FBQyxjQUFjLENBQUM7U0FDM0IsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUMvQixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQy9CLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDaEMsS0FBSyxFQUFFO0lBQ1gsZUFBRyxDQUFDLFFBQVEsQ0FBQztJQUNELFdBQUEsaUJBQUssRUFBRSxDQUFBLEVBQWdCLFdBQUEsaUJBQUssRUFBRSxDQUFBLEVBQWUsV0FBQSxpQkFBSyxFQUFFLENBQUE7Ozs7a0RBRWhFO0FBWFEscUJBQXFCO0lBTGpDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDLElBQUksRUFBRTtRQUNsQixPQUFPLEVBQUUsWUFBWTtRQUNyQixXQUFXLEVBQUUsY0FBYztLQUM5QixDQUFDO0dBQ1cscUJBQXFCLENBWWpDO0FBWlksc0RBQXFCIn0=