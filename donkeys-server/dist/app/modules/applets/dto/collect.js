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
exports.DelCollectDTO = exports.CollectDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 收藏参数校验
 */
class CollectDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number()),
    __metadata("design:type", Number)
], CollectDTO.prototype, "postId", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number()),
    __metadata("design:type", Number)
], CollectDTO.prototype, "photoWallTypeId", void 0);
exports.CollectDTO = CollectDTO;
class DelCollectDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], DelCollectDTO.prototype, "id", void 0);
exports.DelCollectDTO = DelCollectDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9kdG8vY29sbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBcUQ7QUFDckQ7O0dBRUc7QUFDSCxNQUFhLFVBQVU7Q0FPdEI7QUFKRztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7MENBQ1Q7QUFHZjtJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7bURBQ0E7QUFONUIsZ0NBT0M7QUFFRCxNQUFhLGFBQWE7Q0FJekI7QUFERztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7eUNBQ3hCO0FBSGYsc0NBSUMifQ==