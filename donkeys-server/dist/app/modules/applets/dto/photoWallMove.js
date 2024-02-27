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
exports.PhotoWallMoveDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 修改文件分类参数校验
 */
class PhotoWallMoveDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], PhotoWallMoveDTO.prototype, "classifyId", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.array().items(decorator_1.RuleType.number()).required().min(1)),
    __metadata("design:type", Array)
], PhotoWallMoveDTO.prototype, "ids", void 0);
exports.PhotoWallMoveDTO = PhotoWallMoveDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsTW92ZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZHRvL3Bob3RvV2FsbE1vdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JEOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7Q0FRNUI7QUFMRztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7b0RBQ2hCO0FBSW5CO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs2Q0FDcEQ7QUFQbEIsNENBUUMifQ==