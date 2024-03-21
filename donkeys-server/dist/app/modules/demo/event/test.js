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
exports.DemoEvent = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 接收事件
 */
let DemoEvent = class DemoEvent {
    /**
     * 根据事件名接收事件
     * @param msg
     * @param a
     */
    async updateUser(msg, a) {
        console.log('ImEvent', 'updateUser', msg, a);
    }
};
__decorate([
    core_1.Event('updateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DemoEvent.prototype, "updateUser", null);
DemoEvent = __decorate([
    decorator_1.Provide(),
    decorator_1.Scope(decorator_1.ScopeEnum.Singleton),
    core_1.CoolEvent()
], DemoEvent);
exports.DemoEvent = DemoEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9ldmVudC90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFnRTtBQUNoRSw0Q0FBcUQ7QUFFckQ7O0dBRUc7QUFJSCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBQ2xCOzs7O09BSUc7SUFFSCxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKLENBQUE7QUFIRztJQURDLFlBQUssQ0FBQyxZQUFZLENBQUM7Ozs7MkNBR25CO0FBVFEsU0FBUztJQUhyQixtQkFBTyxFQUFFO0lBQ1QsaUJBQUssQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBUyxFQUFFO0dBQ0MsU0FBUyxDQVVyQjtBQVZZLDhCQUFTIn0=