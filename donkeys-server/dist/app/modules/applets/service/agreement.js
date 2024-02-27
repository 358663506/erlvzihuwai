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
exports.AppletsAgreementService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
const moment = require("moment");
const core_1 = require("@cool-midway/core");
const tnwx_1 = require("tnwx");
const core_2 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const agreement_1 = require("../entity/agreement");
/* 协议 */
let AppletsAgreementService = class AppletsAgreementService extends core_1.BaseService {
    async getAgreementQRCode(id) {
        const agreement = await this.appletsAgreementEntity.findOne(id);
        if (!agreement) {
            throw new Error('协议不存在');
        }
        let apiConfig = new tnwx_1.ApiConfig(this.coolConfig.applets.appId, this.coolConfig.applets.secret, 'Javen');
        // 微信公众号、微信小程序、微信小游戏 支持多应用
        tnwx_1.ApiConfigKit.putApiConfig(apiConfig);
        // 设置当前应用
        tnwx_1.ApiConfigKit.setCurrentAppId(tnwx_1.ApiConfigKit.getAppId);
        if (agreement.qrcode) {
            return agreement.qrcode;
        }
        let QrCodeData = await tnwx_1.MiniProgramApi.createQRCode('pages/agreement/detail?id=' + id);
        let qrcodePath = await this.upload(QrCodeData);
        agreement.qrcode = qrcodePath;
        await this.appletsAgreementEntity.save(agreement);
        return qrcodePath;
    }
    async info(id) {
        const info = await this.appletsAgreementEntity.findOne({ id });
        if (!info) {
            throw new core_2.CoolCommException('协议不存在');
        }
        return info;
    }
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = 'DESC', title } = query;
        // 后台 admin 默认查全部
        let result = await this.appletsAgreementEntity
            .createQueryBuilder('a')
            // .select('*')
            .where('1 = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (title) {
                qb.where('a.title LIKE :title', { title: `%${title}%` });
            }
        }))
            .leftJoinAndSelect('a.autographs', 'autographs', 'autographs.agreementId = a.id')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort })
            .getManyAndCount();
        return {
            list: result[0].map((it, index, arr) => {
                it.autographCount = it.autographs.reduce((prev, cur) => {
                    var _a;
                    return prev + (((_a = cur.content) === null || _a === void 0 ? void 0 : _a.split(',').length) || 0);
                }, 0);
                it.autographUserCount = it.autographs.length;
                return it;
            }),
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
    /**
     * 修改状态
     * @param post
     */
    async status(data) {
        const postInfo = await this.appletsAgreementEntity.findOne({ id: data.id });
        if (!postInfo) {
            throw new core_2.CoolCommException('协议不存在');
        }
        postInfo.status = data.status;
        await this.appletsAgreementEntity.save(postInfo);
    }
    /**
     * 保存二维码
     * @param data
     */
    async upload(data) {
        try {
            const name = moment().format('YYYYMMDD') + '/' + uuid_1.v1() + '.png';
            const target = path.join(this.ctx.app.baseDir, '..', `public/uploads/${name}`);
            const dirPath = path.join(this.ctx.app.baseDir, '..', `public/uploads/${moment().format('YYYYMMDD')}`);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(target, data);
            return '/uploads/' + name;
        }
        catch (err) {
            this.logger.error(err);
            throw new core_2.CoolCommException('保存二维码失败');
        }
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], AppletsAgreementService.prototype, "logger", void 0);
__decorate([
    decorator_1.Config('module.applets'),
    __metadata("design:type", Object)
], AppletsAgreementService.prototype, "coolConfig", void 0);
__decorate([
    orm_1.InjectEntityModel(agreement_1.AppletsAgreementEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppletsAgreementService.prototype, "appletsAgreementEntity", void 0);
__decorate([
    decorator_1.Inject('cool:file'),
    __metadata("design:type", Object)
], AppletsAgreementService.prototype, "coolFile", void 0);
AppletsAgreementService = __decorate([
    decorator_1.Provide()
], AppletsAgreementService);
exports.AppletsAgreementService = AppletsAgreementService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdyZWVtZW50LmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL2FncmVlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEQ7QUFDOUQseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLDRDQUEyRDtBQUMzRCwrQkFBMEY7QUFDMUYsNENBQXNEO0FBQ3RELHVDQUFrRDtBQUNsRCxxQ0FBK0M7QUFDL0MsbURBQTZEO0FBSTdELFFBQVE7QUFFUixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGtCQUFXO0lBYXBELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFVO1FBQy9CLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksU0FBUyxHQUFHLElBQUksZ0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RHLDBCQUEwQjtRQUMxQixtQkFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxTQUFTO1FBQ1QsbUJBQVksQ0FBQyxlQUFlLENBQUMsbUJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDbEIsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxVQUFVLEdBQUcsTUFB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