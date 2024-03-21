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
exports.PageReplyByPostDTO = exports.AddReplyDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 回复
 */
class AddReplyDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], AddReplyDTO.prototype, "postId", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number()),
    __metadata("design:type", Number)
], AddReplyDTO.prototype, "replyId", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().required()),
    __metadata("design:type", String)
], AddReplyDTO.prototype, "content", void 0);
exports.AddReplyDTO = AddReplyDTO;
/**
 * 查询回复
 */
class PageReplyByPostDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], PageReplyByPostDTO.prototype, "postId", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().default(1)),
    __metadata("design:type", Number)
], PageReplyByPostDTO.prototype, "page", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().default(15)),
    __metadata("design:type", Number)
], PageReplyByPostDTO.prototype, "size", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.string().default('DESC')),
    __metadata("design:type", String)
], PageReplyByPostDTO.prototype, "sort", void 0);
exports.PageReplyByPostDTO = PageReplyByPostDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZHRvL3JlcGx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxRDtBQUNyRDs7R0FFRztBQUNILE1BQWEsV0FBVztDQVd2QjtBQVJHO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzsyQ0FDcEI7QUFHZjtJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7NENBQ1I7QUFJaEI7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzRDQUNuQjtBQVZwQixrQ0FXQztBQUVEOztHQUVHO0FBQ0gsTUFBYSxrQkFBa0I7Q0FZOUI7QUFURztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7a0RBQ3BCO0FBR2Y7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnREFDdEI7QUFFYjtJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7O2dEQUN2QjtBQUViO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Z0RBQ25CO0FBVnpCLGdEQVlDIn0=