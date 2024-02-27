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
exports.AppletsUserEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
const post_1 = require("./post");
const reply_1 = require("./reply");
const collect_1 = require("./collect");
const history_1 = require("./history");
const autograph_1 = require("./autograph");
/**
 * 小程序用户
 */
let AppletsUserEntity = class AppletsUserEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '用户名', length: 100 }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ comment: '密码', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ comment: '昵称/微信昵称', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "nickName", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ comment: '微信授权 id', nullable: true }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "openId", void 0);
__decorate([
    typeorm_1.Column({ comment: '头像', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "avatarUrl", void 0);
__decorate([
    typeorm_1.Column({ comment: '性别 0:无 1:男 2:女', type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], AppletsUserEntity.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ comment: '城市', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ comment: '省', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "province", void 0);
__decorate([
    typeorm_1.Column({ comment: '国籍', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ comment: 'UNIONID', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "unionId", void 0);
__decorate([
    typeorm_1.Column({ comment: '位置', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ comment: '角色 0:管理员 1:会员 99:普通用户', type: 'tinyint', default: 99 }),
    __metadata("design:type", Number)
], AppletsUserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '手机', nullable: true, length: 20, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ comment: '邮箱', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToMany(() => post_1.AppletsPostEntity, (post) => post.user),
    __metadata("design:type", Array)
], AppletsUserEntity.prototype, "posts", void 0);
__decorate([
    typeorm_1.OneToMany(() => reply_1.AppletsReplayEntity, (reply) => reply.user),
    __metadata("design:type", Array)
], AppletsUserEntity.prototype, "replys", void 0);
__decorate([
    typeorm_1.OneToMany(() => collect_1.AppletsCollectEntity, (collect) => collect.user),
    __metadata("design:type", Array)
], AppletsUserEntity.prototype, "collects", void 0);
__decorate([
    typeorm_1.OneToMany(() => history_1.AppletsHistoryEntity, (history) => history.user),
    __metadata("design:type", Array)
], AppletsUserEntity.prototype, "historys", void 0);
__decorate([
    typeorm_1.Column({ comment: 'accessToken', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "accessToken", void 0);
__decorate([
    typeorm_1.Column({ comment: 'socketId', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "socketId", void 0);
__decorate([
    typeorm_1.Column({ comment: '备注', nullable: true, default: '' }),
    __metadata("design:type", String)
], AppletsUserEntity.prototype, "remark", void 0);
__decorate([
    typeorm_1.OneToMany(() => autograph_1.AppletsAutographEntity, (autograph) => autograph.agreement),
    __metadata("design:type", Array)
], AppletsUserEntity.prototype, "autographs", void 0);
AppletsUserEntity = __decorate([
    orm_1.EntityModel('applets_user')
], AppletsUserEntity);
exports.AppletsUserEntity = AppletsUserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZW50aXR5L3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBbUQ7QUFDbkQsaUNBQTJDO0FBQzNDLG1DQUE4QztBQUM5Qyx1Q0FBaUQ7QUFDakQsdUNBQWlEO0FBQ2pELDJDQUFxRDtBQUNyRDs7R0FFRztBQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsaUJBQVU7Q0FvRmhELENBQUE7QUFsRkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7O21EQUN2QjtBQUdqQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzttREFDdEM7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7bURBQzNDO0FBSWpCO0lBRkMsZUFBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7aURBQ2hDO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7b0RBQ3JDO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJ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