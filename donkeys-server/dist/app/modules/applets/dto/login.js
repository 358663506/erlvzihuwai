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
exports.WeLoginByCodeDTO = exports.WeLoginDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 登录参数校验
 */
class WeLoginDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], WeLoginDTO.prototype, "code", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], WeLoginDTO.prototype, "signature", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], WeLoginDTO.prototype, "rawData", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], WeLoginDTO.prototype, "iv", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], WeLoginDTO.prototype, "encryptedData", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string()),
    __metadata("design:type", String)
], WeLoginDTO.prototype, "openid", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string()),
    __metadata("design:type", String)
], WeLoginDTO.prototype, "session_key", void 0);
exports.WeLoginDTO = WeLoginDTO;
/**
 * 登录参数校验
 */
class WeLoginByCodeDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], WeLoginByCodeDTO.prototype, "code", void 0);
exports.WeLoginByCodeDTO = WeLoginByCodeDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZHRvL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRDtBQUNyRDs7R0FFRztBQUNILE1BQWEsVUFBVTtDQTJCdEI7QUF4Qkc7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3dDQUN0QjtBQUliO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs2Q0FDakI7QUFJbEI7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzJDQUNuQjtBQUloQjtJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7c0NBQ3hCO0FBSVg7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2lEQUNiO0FBSXRCO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOzswQ0FDVDtBQUdmO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOzsrQ0FDSjtBQTFCeEIsZ0NBMkJDO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLGdCQUFnQjtDQUk1QjtBQURHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs4Q0FDdEI7QUFIakIsNENBSUMifQ==