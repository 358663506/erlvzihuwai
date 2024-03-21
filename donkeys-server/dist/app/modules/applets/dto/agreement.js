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
exports.AgreementQRCodeDTO = exports.AgreementStatusDTO = exports.AgreementInfoDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 协议参数校验
 */
class AgreementInfoDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AgreementInfoDTO.prototype, "id", void 0);
exports.AgreementInfoDTO = AgreementInfoDTO;
class AgreementStatusDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AgreementStatusDTO.prototype, "id", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AgreementStatusDTO.prototype, "status", void 0);
exports.AgreementStatusDTO = AgreementStatusDTO;
class AgreementQRCodeDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AgreementQRCodeDTO.prototype, "id", void 0);
exports.AgreementQRCodeDTO = AgreementQRCodeDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWVtZW50LmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2R0by9hZ3JlZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JEOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7Q0FJNUI7QUFERztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7NENBQ3hCO0FBSGYsNENBSUM7QUFDRCxNQUFhLGtCQUFrQjtDQU85QjtBQUpHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs4Q0FDeEI7QUFHWDtJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7a0RBQ3JCO0FBTmxCLGdEQU9DO0FBRUQsTUFBYSxrQkFBa0I7Q0FJOUI7QUFERztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7OENBQ3hCO0FBSGYsZ0RBSUMifQ==