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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL2V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUEyRDtBQUMzRCw0Q0FBcUY7QUFFckY7O0dBRUc7QUFHSCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLHFCQUFjO0lBSW5EOztPQUVHO0lBRUksS0FBSyxDQUFDLElBQUk7UUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0osQ0FBQTtBQVRHO0lBREMsa0JBQU0sQ0FBQyx1QkFBdUIsQ0FBQzs4QkFDZCx1QkFBZ0I7NkRBQUM7QUFNbkM7SUFEQyxlQUFHLENBQUMsT0FBTyxDQUFDOzs7OytDQUdaO0FBVlEsbUJBQW1CO0lBRi9CLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxFQUFFO0dBQ0osbUJBQW1CLENBVy9CO0FBWFksa0RBQW1CIn0=