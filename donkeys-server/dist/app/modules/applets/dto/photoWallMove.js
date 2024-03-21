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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsTW92ZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9kdG8vcGhvdG9XYWxsTW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBcUQ7QUFDckQ7O0dBRUc7QUFDSCxNQUFhLGdCQUFnQjtDQVE1QjtBQUxHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztvREFDaEI7QUFJbkI7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7OzZDQUNwRDtBQVBsQiw0Q0FRQyJ9