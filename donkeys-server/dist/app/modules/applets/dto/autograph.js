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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2dyYXBoLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2R0by9hdXRvZ3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JEOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7Q0FJNUI7QUFERztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7NENBQ3hCO0FBSGYsNENBSUM7QUFDRCxNQUFhLG1CQUFtQjtDQUkvQjtBQURHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzt3REFDZjtBQUh4QixrREFJQztBQUNELE1BQWEsZUFBZTtDQU8zQjtBQUpHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztvREFDZjtBQUdwQjtJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Z0RBQ25CO0FBTnBCLDBDQU9DO0FBRUQsTUFBYSxrQkFBa0I7Q0FTOUI7QUFORztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7OENBQ3hCO0FBS1g7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O21EQUNuQjtBQVJwQixnREFTQztBQUVELE1BQWEsZUFBZTtDQUkzQjtBQURHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzsyQ0FDeEI7QUFIZiwwQ0FJQyJ9