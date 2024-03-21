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
exports.UserRoleDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 修改权限参数校验
 */
class UserRoleDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], UserRoleDTO.prototype, "id", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required(), {
        required: true,
        min: 0,
        max: 99
    }),
    __metadata("design:type", Number)
], UserRoleDTO.prototype, "role", void 0);
exports.UserRoleDTO = UserRoleDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJvbGUuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZHRvL3VzZXJSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRDtBQUNyRDs7R0FFRztBQUNILE1BQWEsV0FBVztDQVl2QjtBQVRHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzt1Q0FDeEI7QUFRWDtJQUxDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNoQyxRQUFRLEVBQUUsSUFBSTtRQUNkLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLEVBQUU7S0FDVixDQUFDOzt5Q0FDVztBQVhqQixrQ0FZQyJ9