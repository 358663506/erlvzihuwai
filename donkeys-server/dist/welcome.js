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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIndlbGNvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJEO0FBRTNELDRDQUFtRTtBQUVuRTs7R0FFRztBQUdILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEscUJBQWM7SUFLMUMsS0FBSyxDQUFDLE9BQU87UUFDaEIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDSixDQUFBO0FBTkc7SUFEQyxrQkFBTSxFQUFFOzs4Q0FDSTtBQUdiO0lBREMsZUFBRyxDQUFDLEdBQUcsQ0FBQzs7OztnREFHUjtBQVBRLGlCQUFpQjtJQUY3QixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQyxHQUFHLENBQUM7R0FDUCxpQkFBaUIsQ0FRN0I7QUFSWSw4Q0FBaUIifQ==