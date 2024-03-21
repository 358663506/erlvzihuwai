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
const orm_1 = require("@midwayjs/orm");
const post_1 = require("../../entity/post");
const typeorm_1 = require("typeorm");
const enroll_muster_address_1 = require("../../entity/enroll_muster_address");
/* 活动成员服务*/
let EnrollUserController = class EnrollUserController extends core_1.BaseController {
    /**
     * 活动成员列表
     * @returns
     */
    async carouselList() {
        const id = 51;
        if (!id) {
            throw new core_1.CoolCommException('非法操作~');
        }
        let info = await this.appletsPostEntity
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.user', 'user')
            .loadRelationCountAndMap('p.replyCount', 'p.replys')
            .loadRelationCountAndMap('p.collectCount', 'p.collects')
            .where('p.id = :id', { id })
            .getOne();
        info.addressList = await this.appletsEnrollMusterAddressEntity.createQueryBuilder("p").where("p.enroll_id=:id", { id }).getMany();
        console.log(info);
        if (!info) {
            throw new core_1.CoolCommException('文章不存在');
        }
        return this.ok(info);
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
    orm_1.InjectEntityModel(post_1.AppletsPostEntity),
    __metadata("design:type", typeorm_1.Repository)
], EnrollUserController.prototype, "appletsPostEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(enroll_muster_address_1.AppletsEnrollMusterAddressEntity),
    __metadata("design:type", typeorm_1.Repository)
], EnrollUserController.prototype, "appletsEnrollMusterAddressEntity", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsVXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9lbnJvbGwvZW5yb2xsVXNlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBVTtBQUNWLG1EQUFpRjtBQUNqRiw0Q0FBb0Y7QUFDcEYsdUVBQWtFO0FBQ2xFLHVDQUFnRDtBQUNoRCw0Q0FBb0Q7QUFDcEQscUNBQW1DO0FBQ25DLDhFQUFvRjtBQUtwRixXQUFXO0FBR1gsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxxQkFBYztJQVFwRDs7O09BR0c7SUFFSSxLQUFLLENBQUMsWUFBWTtRQUVyQixNQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ0wsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCO2FBQ2xDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQzthQUN2QixpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2FBQ25DLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUM7YUFDbkQsdUJBQXVCLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDO2FBQ3ZELEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUMzQixNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUs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