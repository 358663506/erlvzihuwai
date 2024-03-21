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
exports.WelcomeController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 欢迎界面
 */
let WelcomeController = class WelcomeController extends core_1.BaseController {
    async welcome() {
        await this.ctx.render('welcome', { text: 'HELLO COOL-ADMIN 4.x' });
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], WelcomeController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "welcome", null);
WelcomeController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController('/')
], WelcomeController);
exports.WelcomeController = WelcomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsid2VsY29tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkQ7QUFFM0QsNENBQW1FO0FBRW5FOztHQUVHO0FBR0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxxQkFBYztJQUsxQyxLQUFLLENBQUMsT0FBTztRQUNoQixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNKLENBQUE7QUFORztJQURDLGtCQUFNLEVBQUU7OzhDQUNJO0FBR2I7SUFEQyxlQUFHLENBQUMsR0FBRyxDQUFDOzs7O2dEQUdSO0FBUFEsaUJBQWlCO0lBRjdCLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDLEdBQUcsQ0FBQztHQUNQLGlCQUFpQixDQVE3QjtBQVJZLDhDQUFpQiJ9