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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2R0by9yZXBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBcUQ7QUFDckQ7O0dBRUc7QUFDSCxNQUFhLFdBQVc7Q0FXdkI7QUFSRztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7MkNBQ3BCO0FBR2Y7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7OzRDQUNSO0FBSWhCO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs0Q0FDbkI7QUFWcEIsa0NBV0M7QUFFRDs7R0FFRztBQUNILE1BQWEsa0JBQWtCO0NBWTlCO0FBVEc7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2tEQUNwQjtBQUdmO0lBREMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0RBQ3RCO0FBRWI7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnREFDdkI7QUFFYjtJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O2dEQUNuQjtBQVZ6QixnREFZQyJ9