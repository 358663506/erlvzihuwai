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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vY29udHJvbGxlci9hcHAvc3dhZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBMEQ7QUFDMUQsNENBQW1FO0FBQ25FLCtDQUFpRDtBQUVqRDs7R0FFRztBQU1ILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFTckQsS0FBSyxDQUFDLEtBQUssQ0FBVSxJQUFZLEVBQVcsR0FBVyxFQUFXLElBQVk7UUFDMUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDSixDQUFBO0FBSEc7SUFSQyxzQkFBWSxFQUFFO1NBQ1YsT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUNuQixXQUFXLENBQUMsY0FBYyxDQUFDO1NBQzNCLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDL0IsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUMvQixLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ2hDLEtBQUssRUFBRTtJQUNYLGVBQUcsQ0FBQyxRQUFRLENBQUM7SUFDRCxXQUFBLGlCQUFLLEVBQUUsQ0FBQSxFQUFnQixXQUFBLGlCQUFLLEVBQUUsQ0FBQSxFQUFlLFdBQUEsaUJBQUssRUFBRSxDQUFBOzs7O2tEQUVoRTtBQVhRLHFCQUFxQjtJQUxqQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsT0FBTyxFQUFFLFlBQVk7UUFDckIsV0FBVyxFQUFFLGNBQWM7S0FDOUIsQ0FBQztHQUNXLHFCQUFxQixDQVlqQztBQVpZLHNEQUFxQiJ9