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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L3JlcGx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMscUNBQXVEO0FBQ3ZELGlDQUEyQztBQUMzQyxpQ0FBMkM7QUFDM0MsNENBQStDO0FBQy9DOztHQUVHO0FBRUgsSUFBYSxtQkFBbUIsMkJBQWhDLE1BQWEsbUJBQW9CLFNBQVEsaUJBQVU7Q0FzQmxELENBQUE7QUFwQkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztvREFDWjtBQUloQjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7OEJBQ3BELHdCQUFpQjtpREFBQztBQUl4QjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7OEJBQ3BELHdCQUFpQjtpREFBQztBQUl4QjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQW1CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7OEJBQ3ZELG1CQUFtQjtrREFBQztBQUkzQjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQW1CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7OEJBQ3JELG1CQUFtQjttREFBQztBQUc1QjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzttREFDbEQ7QUFyQk4sbUJBQW1CO0lBRC9CLGlCQUFXLENBQUMsZ0JBQWdCLENBQUM7R0FDakIsbUJBQW1CLENBc0IvQjtBQXRCWSxrREFBbUIifQ==