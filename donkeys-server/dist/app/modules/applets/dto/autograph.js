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
exports.AutographDelDTO = exports.AutographUpdateDTO = exports.AutographAddDTO = exports.AutographByAgreeDTO = exports.AutographInfoDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 协议参数校验
 */
class AutographInfoDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AutographInfoDTO.prototype, "id", void 0);
exports.AutographInfoDTO = AutographInfoDTO;
class AutographByAgreeDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AutographByAgreeDTO.prototype, "agreementId", void 0);
exports.AutographByAgreeDTO = AutographByAgreeDTO;
class AutographAddDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AutographAddDTO.prototype, "agreementId", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], AutographAddDTO.prototype, "content", void 0);
exports.AutographAddDTO = AutographAddDTO;
class AutographUpdateDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AutographUpdateDTO.prototype, "id", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], AutographUpdateDTO.prototype, "content", void 0);
exports.AutographUpdateDTO = AutographUpdateDTO;
class AutographDelDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AutographDelDTO.prototype, "id", void 0);
exports.AutographDelDTO = AutographDelDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2dyYXBoLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9kdG8vYXV0b2dyYXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRDtBQUNyRDs7R0FFRztBQUNILE1BQWEsZ0JBQWdCO0NBSTVCO0FBREc7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzRDQUN4QjtBQUhmLDRDQUlDO0FBQ0QsTUFBYSxtQkFBbUI7Q0FJL0I7QUFERztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7d0RBQ2Y7QUFIeEIsa0RBSUM7QUFDRCxNQUFhLGVBQWU7Q0FPM0I7QUFKRztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7b0RBQ2Y7QUFHcEI7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2dEQUNuQjtBQU5wQiwwQ0FPQztBQUVELE1BQWEsa0JBQWtCO0NBTzlCO0FBSkc7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzhDQUN4QjtBQUdYO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzttREFDbkI7QUFOcEIsZ0RBT0M7QUFFRCxNQUFhLGVBQWU7Q0FJM0I7QUFERztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7MkNBQ3hCO0FBSGYsMENBSUMifQ==