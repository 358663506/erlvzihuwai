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
exports.PostTopDTO = exports.PostStatusDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 修改权限参数校验
 */
class PostStatusDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], PostStatusDTO.prototype, "id", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required(), {
        required: true,
        min: 0,
        max: 99
    }),
    __metadata("design:type", Number)
], PostStatusDTO.prototype, "status", void 0);
exports.PostStatusDTO = PostStatusDTO;
/**
 * 修改权限参数校验
 */
class PostTopDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], PostTopDTO.prototype, "id", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required(), {
        required: true,
        min: 0,
        max: 1
    }),
    __metadata("design:type", Number)
], PostTopDTO.prototype, "top", void 0);
exports.PostTopDTO = PostTopDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9kdG8vcG9zdFN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBcUQ7QUFDckQ7O0dBRUc7QUFDSCxNQUFhLGFBQWE7Q0FZekI7QUFURztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7eUNBQ3hCO0FBUVg7SUFMQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDaEMsUUFBUSxFQUFFLElBQUk7UUFDZCxHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxFQUFFO0tBQ1YsQ0FBQzs7NkNBQ3dCO0FBWDlCLHNDQVlDO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLFVBQVU7Q0FZdEI7QUFURztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7c0NBQ3hCO0FBUVg7SUFMQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDaEMsUUFBUSxFQUFFLElBQUk7UUFDZCxHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO0tBQ1QsQ0FBQzs7dUNBQ1M7QUFYZixnQ0FZQyJ9