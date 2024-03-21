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
exports.EnrollUserController = void 0;
/* 微信用户 */
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const enrollUserService_1 = require("../../service/enrollUserService");
/* 活动成员服务*/
let EnrollUserController = class EnrollUserController extends core_1.BaseController {
    /**
     * 活动成员列表
     * @returns
     */
    async carouselList() {
        return this.ok("123455566OK");
    }
    /**
     * 活动成员分页列表
     * @returns
     */
    async page(query) {
        return this.ok(await this.enrollUserService.page(query));
    }
    /**
     * 添加活动成员
     * @returns
     */
    async add(data = {}) {
        return this.ok(await this.enrollUserService.add(data));
    }
    /**
     * 修改
     * @returns
     */
    async update(data = {}) {
        return this.ok(await this.enrollUserService.update(data));
    }
    /**
     * 成员上下车
     */
    async order(id) {
        return this.ok(await this.enrollUserService.status(id));
    }
    /**
     * 删除成员
     * @returns
     */
    async delete(id) {
        return this.ok(await this.enrollUserService.deleteById(id));
    }
    /**
     * 成员信息
     * @returns
     */
    async info(id) {
        return this.ok(await this.enrollUserService.info(id));
    }
    /**
     * 根据活动获取成员信息
     * @returns
     */
    async getByEnrollId(openId, enrollId) {
        return this.ok(await this.enrollUserService.getByEnrollId(openId, enrollId));
    }
    /**
     * 获取已填的身份证信息
     * @returns
     */
    async getIdCardByOpenId(openId) {
        return this.ok(await this.enrollUserService.getIdCardByOpenId(openId));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", enrollUserService_1.EnrollUserService)
], EnrollUserController.prototype, "enrollUserService", void 0);
__decorate([
    decorator_1.Get('/list', { summary: '活动成员列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "carouselList", null);
__decorate([
    decorator_1.Post('/page', { summary: '活动成员列表' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "page", null);
__decorate([
    decorator_1.Post('/add', { summary: '添加活动成员' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "add", null);
__decorate([
    decorator_1.Post('/update', { summary: '修改活动成员' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "update", null);
__decorate([
    decorator_1.Post('/post/status', { summary: '成员上下车' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "order", null);
__decorate([
    decorator_1.Post('/delete', { summary: '删除成员' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "delete", null);
__decorate([
    decorator_1.Post('/info', { summary: '成员信息' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "info", null);
__decorate([
    decorator_1.Get('/getByEnrollId', { summary: '根据活动获取成员信息' }),
    __param(0, decorator_1.Query('openId')), __param(1, decorator_1.Query('enrollId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "getByEnrollId", null);
__decorate([
    decorator_1.Get('/getIdCardByOpenId', { summary: '获取已填的身份证信息' }),
    __param(0, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollUserController.prototype, "getIdCardByOpenId", null);
EnrollUserController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController("/enrollUser")
], EnrollUserController);
exports.EnrollUserController = EnrollUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsVXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9lbnJvbGwvZW5yb2xsVXNlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBVTtBQUNWLG1EQUFpRjtBQUNqRiw0Q0FBaUU7QUFDakUsdUVBQWtFO0FBS2xFLFdBQVc7QUFHWCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLHFCQUFjO0lBS3BEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxZQUFZO1FBRXJCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FBWSxLQUFLO1FBRTlCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLEdBQUcsQ0FBWSxPQUFZLEVBQUU7UUFFdEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7O09BR0c7SUFFSSxLQUFLLENBQUMsTUFBTSxDQUFZLE9BQVksRUFBRTtRQUV6QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLEtBQUssQ0FBUyxFQUFVO1FBQzFCLE9BQU8sSUFB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