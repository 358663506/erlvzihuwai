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
exports.AppletsAutographService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const autograph_1 = require("../entity/autograph");
const user_1 = require("../entity/user");
const agreement_1 = require("../entity/agreement");
/** 签名 */
let AppletsAutographService = class AppletsAutographService extends core_1.BaseService {
    /** 新增签名 */
    async addAutograph(param) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ id: appUser.userId });
        if (!userInfo) {
            throw new core_1.CoolCommException('未知错误');
        }
        // 查询协议
        const agreementInfo = await this.appletsAgreementEntity.findOne({ id: +param.agreementId });
        // 添加
        let autographInfo = new autograph_1.AppletsAutographEntity();
        autographInfo.user = userInfo;
        autographInfo.agreement = agreementInfo;
        autographInfo.content = param.content;
        console.log(autographInfo);
        await this.appletsAutographEntity.save(autographInfo);
    }
    /** 查询签名 */
    async getAutograph(agreementId) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        const autograph = await this.appletsAutographEntity.findOne({ user: { id: appUser.userId }, agreement: { id: agreementId } });
        return autograph;
    }
    /** 更新签名 */
    async updateAutograph(param) {
        const appUser = this.ctx.appUser;
        if (!appUser)
            throw new core_1.CoolCommException('未知错误');
        const autograph = await this.appletsAutographEntity.findOne({ id: param.id }, { relations: ['user'] });
        if (!autograph) {
            throw new core_1.CoolCommException('签名不存在');
        }
        console.log(appUser.userId);
        console.log(autograph.user.id);
        if (autograph.user.id !== Number(appUser.userId)) {
            throw new core_1.CoolCommException('非法操作');
        }
        autograph.content = param.content;
        await this.appletsAutographEntity.save(autograph);
    }
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = 'DESC', title, agreementId = null } = query;
        // 后台 admin 默认查全部
        let result = await this.appletsAutographEntity
            .createQueryBuilder('a')
            .where('1 = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (title) {
                qb.where('a.agreementId = :agreementId', { agreementId: agreementId });
            }
        }))
            .leftJoinAndSelect('a.user', 'user', 'user.id = a.userId')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort })
            .getManyAndCount();
        return {
            list: result[0].map((it, index, arr) => {
                var _a;
                it.userName = ((_a = it === null || it === void 0 ? void 0 : it.user) === null || _a === void 0 ? void 0 : _a.nickName) || '';
                return it;
            }),
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
};
__decorate([
    orm_1.InjectEntityModel(autograph_1.AppletsAutographEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsAutographService.prototype, "appletsAutographEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.AppletsUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsAutographService.prototype, "appletsUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(agreement_1.AppletsAgreementEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsAutographService.prototype, "appletsAgreementEntity", void 0);
AppletsAutographService = __decorate([
    decorator_1.Provide()
], AppletsAutographService);
exports.AppletsAutographService = AppletsAutographService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2dyYXBoLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL2F1dG9ncmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBK0M7QUFDL0MsbURBQTZEO0FBQzdELHlDQUFtRDtBQUNuRCxtREFBNkQ7QUFHN0QsU0FBUztBQUVULElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsa0JBQVc7SUFVcEQsV0FBVztJQUNYLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBc0I7UUFDckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU87WUFBRSxNQUFNLElBQUksd0JBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsT0FBTztRQUNQLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTztRQUNQLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLEtBQUs7UUFDTCxJQUFJLGFBQWEsR0FBRyxJQUFJLGtDQUFzQixFQUFFLENBQUM7UUFDakQsYUFBYSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDOUIsYUFBYSxDQUFDLFNBQVMs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