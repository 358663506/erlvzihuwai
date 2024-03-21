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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWVtZW50LmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2NvbnRyb2xsZXIvYWRtaW4vYWdyZWVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUF1RTtBQUN2RSw0Q0FBbUU7QUFDbkUsdURBQWtFO0FBQ2xFLHNEQUFnRTtBQUNoRSxtREFBNkU7QUFFN0UsVUFBVTtBQU9WLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEscUJBQWM7SUFJMUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFZLElBQXdCO1FBQzNDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBR0QsS0FBSyxDQUFDLGtCQUFrQixDQUFZLElBQXdCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0NBQ0osQ0FBQTtBQWRHO0lBREMsa0JBQU0sRUFBRTs4QkFDZ0IsbUNBQXVCOzJFQUFDO0FBTWpEO0lBREMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDeEIsV0FBQSxnQkFBSSxDQUFDLGVBQUcsQ0FBQyxDQUFBOztxQ0FBTyw4QkFBa0I7O3VEQUU5QztBQUdEO0lBREMsZ0JBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMxQixXQUFBLGdCQUFJLENBQUMsZUFBRyxDQUFDLENBQUE7O3FDQUFPLDhCQUFrQjs7b0VBRTNEO0FBZlEsMEJBQTBCO0lBTnRDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ1osR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLGtDQUFzQjtRQUM5QixPQUFPLEVBQUUsbUNBQXVCO0tBQ25DLENBQUM7R0FDVywwQkFBMEIsQ0FnQnRDO0FBaEJZLGdFQUEwQiJ9