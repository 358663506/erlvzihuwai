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
exports.AppletsAgreementController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const agreement_1 = require("../../service/agreement");
const agreement_2 = require("../../entity/agreement");
const agreement_3 = require("../../dto/agreement");
/* 活动发布 */
let AppletsAgreementController = class AppletsAgreementController extends core_1.BaseController {
    /**
     * 修改状态
     */
    async order(data) {
        return this.ok(await this.appletsAgreementService.status(data));
    }
    async getAgreementQRCode(data) {
        return this.ok(await this.appletsAgreementService.getAgreementQRCode(data.id));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", agreement_1.AppletsAgreementService)
], AppletsAgreementController.prototype, "appletsAgreementService", void 0);
__decorate([
    decorator_1.Post('/status', { summary: '修改角色' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agreement_3.AgreementStatusDTO]),
    __metadata("design:returntype", Promise)
], AppletsAgreementController.prototype, "order", null);
__decorate([
    decorator_1.Post('/getAgreementQRCode', { summary: '获取协议二维码' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agreement_3.AgreementQRCodeDTO]),
    __metadata("design:returntype", Promise)
], AppletsAgreementController.prototype, "getAgreementQRCode", null);
AppletsAgreementController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: agreement_2.AppletsAgreementEntity,
        service: agreement_1.AppletsAgreementService
    })
], AppletsAgreementController);
exports.AppletsAgreementController = AppletsAgreementController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWVtZW50LmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FkbWluL2FncmVlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBdUU7QUFDdkUsNENBQW1FO0FBQ25FLHVEQUFrRTtBQUNsRSxzREFBZ0U7QUFDaEUsbURBQTZFO0FBRTdFLFVBQVU7QUFPVixJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLHFCQUFjO0lBSTFEOztPQUVHO0lBRUgsS0FBSyxDQUFDLEtBQUssQ0FBWSxJQUF3QjtRQUMzQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUdELEtBQUssQ0FBQyxrQkFBa0IsQ0FBWSxJQUF3QjtRQUN4RCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNKLENBQUE7QUFkRztJQURDLGtCQUFNLEVBQUU7OEJBQ2dCLG1DQUF1QjsyRUFBQztBQU1qRDtJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLFdBQUEsZ0JBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQTs7cUNBQU8sOEJBQWtCOzt1REFFOUM7QUFHRDtJQURDLGdCQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDMUIsV0FBQSxnQkFBSSxDQUFDLGVBQUcsQ0FBQyxDQUFBOztxQ0FBTyw4QkFBa0I7O29FQUUzRDtBQWZRLDBCQUEwQjtJQU50QyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxrQ0FBc0I7UUFDOUIsT0FBTyxFQUFFLG1DQUF1QjtLQUNuQyxDQUFDO0dBQ1csMEJBQTBCLENBZ0J0QztBQWhCWSxnRUFBMEIifQ==