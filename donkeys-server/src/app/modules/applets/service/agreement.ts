import { Config, Inject, Provide } from '@midwayjs/decorator';
import * as fs from 'fs';
import * as path from 'path';
import { v1 as uuid } from 'uuid';
import * as moment from 'moment';
import { BaseService, ICoolFile } from '@cool-midway/core';
import { /* , accesstoken, cache */ ApiConfig, ApiConfigKit, MiniProgramApi } from 'tnwx';
import { CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Brackets, Repository } from 'typeorm';
import { AppletsAgreementEntity } from '../entity/agreement';
import { ILogger } from '@midwayjs/logger';
import { AgreementStatusDTO } from '../dto/agreement';
import { Iconfig } from '../config';
/* 协议 */
@Provide()
export class AppletsAgreementService extends BaseService {
    @Inject()
    logger: ILogger;

    @Config('module.applets')
    coolConfig: Iconfig;

    @InjectEntityModel(AppletsAgreementEntity)
    appletsAgreementEntity: Repository<AppletsAgreementEntity>;

    @Inject('cool:file')
    coolFile: ICoolFile;

    async getAgreementQRCode(id: number) {
        const agreement = await this.appletsAgreementEntity.findOne(id);
        if (!agreement) {
            throw new Error('协议不存在');
        }
        let apiConfig = new ApiConfig(this.coolConfig.applets.appId, this.coolConfig.applets.secret, 'Javen');
        // 微信公众号、微信小程序、微信小游戏 支持多应用
        ApiConfigKit.putApiConfig(apiConfig);
        // 设置当前应用
        ApiConfigKit.setCurrentAppId(this.coolConfig.applets.appId);
        if (agreement.qrcode) {
            return agreement.qrcode;
        }
        let QrCodeData = await MiniProgramApi.createQRCode('pages/agreement/detai?id=' + id);
        let qrcodePath = await this.upload(QrCodeData);
        agreement.qrcode = qrcodePath;
        await this.appletsAgreementEntity.save(agreement);
        return qrcodePath;
    }
    async info(id: number) {
        const info = await this.appletsAgreementEntity.findOne({ id });
        if (!info) {
            throw new CoolCommException('协议不存在');
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
            .andWhere(
                new Brackets((qb) => {
                    if (title) {
                        qb.where('a.title LIKE :title', { title: `%${title}%` });
                    }
                })
            )
            .leftJoinAndSelect('a.autographs', 'autographs', 'autographs.agreementId = a.id')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort })
            .getManyAndCount();
        return {
            list: result[0].map((it, index, arr) => {
                it.autographCount = it.autographs.reduce((prev, cur) => {
                    return prev + (cur.content?.split(',').length || 0);
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
    public async status(data: AgreementStatusDTO) {
        const postInfo = await this.appletsAgreementEntity.findOne({ id: data.id });
        if (!postInfo) {
            throw new CoolCommException('协议不存在');
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
            const name = moment().format('YYYYMMDD') + '/' + uuid() + '.png';
            const target = path.join(this.ctx.app.baseDir, '..', `public/uploads/${name}`);
            const dirPath = path.join(this.ctx.app.baseDir, '..', `public/uploads/${moment().format('YYYYMMDD')}`);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(target, data);
            return '/uploads/' + name;
        } catch (err) {
            this.logger.error(err);
            throw new CoolCommException('保存二维码失败');
        }
    }
}
