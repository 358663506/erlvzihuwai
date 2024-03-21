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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9lbnRpdHkvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUFtRDtBQUNuRCxpQ0FBMkM7QUFDM0MsbUNBQThDO0FBQzlDLHVDQUFpRDtBQUNqRCx1Q0FBaUQ7QUFDakQsMkNBQXFEO0FBQ3JEOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxpQkFBVTtDQW9GaEQsQ0FBQTtBQWxGRztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzs7bURBQ3ZCO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUM7O21EQUN0QztBQUdqQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzttREFDM0M7QUFJakI7SUFGQyxlQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkIsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDaEM7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOztvREFDckM7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLElB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