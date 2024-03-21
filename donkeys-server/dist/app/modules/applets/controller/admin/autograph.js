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
exports.AppletsAutographController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const autograph_1 = require("../../entity/autograph");
const autograph_2 = require("../../service/autograph");
/* 活动发布 */
let AppletsAutographController = class AppletsAutographController extends core_1.BaseController {
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", autograph_2.AppletsAutographService)
], AppletsAutographController.prototype, "appletsAutographService", void 0);
AppletsAutographController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: autograph_1.AppletsAutographEntity,
        service: autograph_2.AppletsAutographService
    })
], AppletsAutographController);
exports.AppletsAutographController = AppletsAutographController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2dyYXBoLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2NvbnRyb2xsZXIvYWRtaW4vYXV0b2dyYXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsc0RBQWdFO0FBQ2hFLHVEQUFrRTtBQUVsRSxVQUFVO0FBT1YsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSxxQkFBYztDQUc3RCxDQUFBO0FBREc7SUFEQyxrQkFBTSxFQUFFOzhCQUNnQixtQ0FBdUI7MkVBQUM7QUFGeEMsMEJBQTBCO0lBTnRDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ1osR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLGtDQUFzQjtRQUM5QixPQUFPLEVBQUUsbUNBQXVCO0tBQ25DLENBQUM7R0FDVywwQkFBMEIsQ0FHdEM7QUFIWSxnRUFBMEIifQ==