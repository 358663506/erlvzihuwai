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
exports.BaseAppCommController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 不需要登录的后台接口
 */
let BaseAppCommController = class BaseAppCommController extends core_1.BaseController {
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        console.log(this.coolCache.getMode());
        return this.ok(this.eps);
    }
    /**
     * 文件上传
     */
    async upload() {
        return this.ok(await this.coolFile.upload(this.ctx));
    }
    /**
     * 文件上传模式，本地或者云存储
     */
    async uploadMode() {
        return this.ok(this.coolFile.getMode());
    }
};
__decorate([
    decorator_1.Inject('cool:eps:open'),
    __metadata("design:type", Object)
], BaseAppCommController.prototype, "eps", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], BaseAppCommController.prototype, "coolCache", void 0);
__decorate([
    decorator_1.Inject('cool:file'),
    __metadata("design:type", Object)
], BaseAppCommController.prototype, "coolFile", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseAppCommController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Get('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "getEps", null);
__decorate([
    decorator_1.Post('/upload', { summary: '文件上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "upload", null);
__decorate([
    decorator_1.Get('/uploadMode', { summary: '文件上传模式' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "uploadMode", null);
BaseAppCommController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], BaseAppCommController);
exports.BaseAppCommController = BaseAppCommController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FwcC9jb21tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFpRTtBQUNqRSw0Q0FBMEY7QUFHMUY7O0dBRUc7QUFHSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBYXJEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxNQUFNO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0osQ0FBQTtBQXBDRztJQURDLGtCQUFNLENBQUMsZUFBZSxDQUFDOztrREFDcEI7QUFHSjtJQURDLGtCQUFNLENBQUMsWUFBWSxDQUFDOzt3REFDQztBQUd0QjtJQURDLGtCQUFNLENBQUMsV0FBVyxDQUFDOzt1REFDQTtBQUdwQjtJQURDLGtCQUFNLEVBQUU7O2tEQUNJO0FBT2I7SUFEQyxlQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzs7O21EQUluQztBQU1EO0lBREMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7bURBR3BDO0FBTUQ7SUFEQyxlQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzs7O3VEQUd6QztBQXJDUSxxQkFBcUI7SUFGakMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLEVBQUU7R0FDSixxQkFBcUIsQ0FzQ2pDO0FBdENZLHNEQUFxQiJ9