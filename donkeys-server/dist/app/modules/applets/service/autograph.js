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
        // 查询协议
        const agreementInfo = await this.appletsAgreementEntity.findOne({ id: +param.agreementId });
        if (!userInfo || !agreementInfo) {
            throw new core_1.CoolCommException('参数错误');
        }
        if (agreementInfo.status !== 1) {
            // 非法操作
            throw new core_1.CoolCommException('非法操作');
        }
        let autographInfo = new autograph_1.AppletsAutographEntity();
        const info = await this.appletsAutographEntity.findOne({ user: { id: appUser.userId }, agreement: { id: param.agreementId } });
        if (info && info.id) {
            autographInfo = info;
        }
        // 添加
        autographInfo.user = userInfo;
        autographInfo.agreement = agreementInfo;
        autographInfo.content = param.content;
        await this.appletsAutographEntity.save(autographInfo);
        return autographInfo;
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
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ id: appUser.userId });
        let autograph = await this.appletsAutographEntity.findOne({ id: param.id }, { relations: ['user'] });
        const agreementInfo = await this.appletsAgreementEntity.findOne({ id: +param.agreementId });
        if (agreementInfo.status !== 1) {
            // 非法操作
            throw new core_1.CoolCommException('非法操作');
        }
        if (!autograph) {
            autograph = await this.appletsAutographEntity.findOne({ user: { id: appUser.userId }, agreement: { id: param.agreementId } }, { relations: ['user'] });
            if (!autograph) {
                autograph = new autograph_1.AppletsAutographEntity();
                autograph.user = userInfo;
                autograph.agreement = agreementInfo;
            }
            autograph.content = param.content;
        }
        if (autograph.user.id !== Number(appUser.userId)) {
            throw new core_1.CoolCommException('非法操作');
        }
        autograph.content = param.content;
        await this.appletsAutographEntity.save(autograph);
        return autograph;
    }
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = 'DESC', agreementId = null } = query;
        // 后台 admin 默认查全部
        let result = await this.appletsAutographEntity
            .createQueryBuilder('a')
            .select('')
            .where('1 = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (agreementId) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2dyYXBoLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL3NlcnZpY2UvYXV0b2dyYXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUErQztBQUMvQyxtREFBNkQ7QUFDN0QseUNBQW1EO0FBQ25ELG1EQUE2RDtBQUc3RCxTQUFTO0FBRVQsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxrQkFBVztJQVVwRCxXQUFXO0lBQ1gsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFzQjtRQUNyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxPQUFPO1FBQ1AsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE9BQU87UUFDUCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzdCLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTztZQUNQLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztT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