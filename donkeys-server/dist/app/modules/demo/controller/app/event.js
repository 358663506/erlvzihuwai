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
exports.DemoEventController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 事件
 */
let DemoEventController = class DemoEventController extends core_1.BaseController {
    /**
     * 发送事件
     */
    async send() {
        this.coolEventManager.emit('updateUser', { a: 1 }, 12);
    }
};
__decorate([
    decorator_1.Inject('cool:coolEventManager'),
    __metadata("design:type", core_1.CoolEventManager)
], DemoEventController.prototype, "coolEventManager", void 0);
__decorate([
    decorator_1.Get('/send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoEventController.prototype, "send", null);
DemoEventController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], DemoEventController);
exports.DemoEventController = DemoEventController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vY29udHJvbGxlci9hcHAvZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJEO0FBQzNELDRDQUFxRjtBQUVyRjs7R0FFRztBQUdILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEscUJBQWM7SUFJbkQ7O09BRUc7SUFFSSxLQUFLLENBQUMsSUFBSTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDSixDQUFBO0FBVEc7SUFEQyxrQkFBTSxDQUFDLHVCQUF1QixDQUFDOzhCQUNkLHVCQUFnQjs2REFBQztBQU1uQztJQURDLGVBQUcsQ0FBQyxPQUFPLENBQUM7Ozs7K0NBR1o7QUFWUSxtQkFBbUI7SUFGL0IsbUJBQU8sRUFBRTtJQUNULHFCQUFjLEVBQUU7R0FDSixtQkFBbUIsQ0FXL0I7QUFYWSxrREFBbUIifQ==