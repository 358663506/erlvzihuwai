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
var AppletsReplayEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppletsReplayEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const post_1 = require("./post");
const core_1 = require("@cool-midway/core");
/**
 * 回复
 */
let AppletsReplayEntity = AppletsReplayEntity_1 = class AppletsReplayEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '回复内容' }),
    __metadata("design:type", String)
], AppletsReplayEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.ManyToOne(() => post_1.AppletsPostEntity, (post) => post.replys),
    __metadata("design:type", post_1.AppletsPostEntity)
], AppletsReplayEntity.prototype, "post", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.AppletsUserEntity, (user) => user.replys),
    __metadata("design:type", user_1.AppletsUserEntity)
], AppletsReplayEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => AppletsReplayEntity_1, (reply) => reply.replys),
    __metadata("design:type", AppletsReplayEntity)
], AppletsReplayEntity.prototype, "reply", void 0);
__decorate([
    typeorm_1.OneToMany(() => AppletsReplayEntity_1, (reply) => reply.reply),
    __metadata("design:type", AppletsReplayEntity)
], AppletsReplayEntity.prototype, "replys", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], AppletsReplayEntity.prototype, "status", void 0);
AppletsReplayEntity = AppletsReplayEntity_1 = __decorate([
    orm_1.EntityModel('applets_replay')
], AppletsReplayEntity);
exports.AppletsReplayEntity = AppletsReplayEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2VudGl0eS9yZXBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUF1RDtBQUN2RCxpQ0FBMkM7QUFDM0MsaUNBQTJDO0FBQzNDLDRDQUErQztBQUMvQzs7R0FFRztBQUVILElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFvQixTQUFRLGlCQUFVO0NBc0JsRCxDQUFBO0FBcEJHO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7b0RBQ1o7QUFJaEI7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUFpQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzhCQUNwRCx3QkFBaUI7aURBQUM7QUFJeEI7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUFpQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzhCQUNwRCx3QkFBaUI7aURBQUM7QUFJeEI7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFtQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzhCQUN2RCxtQkFBbUI7a0RBQUM7QUFJM0I7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFtQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOzhCQUNyRCxtQkFBbUI7bURBQUM7QUFHNUI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7bURBQ2xEO0FBckJOLG1CQUFtQjtJQUQvQixpQkFBVyxDQUFDLGdCQUFnQixDQUFDO0dBQ2pCLG1CQUFtQixDQXNCL0I7QUF0Qlksa0RBQW1CIn0=