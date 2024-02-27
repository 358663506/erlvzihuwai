import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Brackets, Repository } from 'typeorm';
import { AppletsAutographEntity } from '../entity/autograph';
import { AppletsUserEntity } from '../entity/user';
import { AppletsAgreementEntity } from '../entity/agreement';
import { AutographAddDTO, AutographUpdateDTO } from '../dto/autograph';

/** 签名 */
@Provide()
export class AppletsAutographService extends BaseService {
    @InjectEntityModel(AppletsAutographEntity)
    appletsAutographEntity: Repository<AppletsAutographEntity>;

    @InjectEntityModel(AppletsUserEntity)
    appletsUserEntity: Repository<AppletsUserEntity>;

    @InjectEntityModel(AppletsAgreementEntity)
    appletsAgreementEntity: Repository<AppletsAgreementEntity>;

    /** 新增签名 */
    async addAutograph(param: AutographAddDTO) {
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ id: appUser.userId });
        // 查询协议
        const agreementInfo = await this.appletsAgreementEntity.findOne({ id: +param.agreementId });
        if (!userInfo || !agreementInfo) {
            throw new CoolCommException('参数错误');
        }

        if (agreementInfo.status !== 1) {
            // 非法操作
            throw new CoolCommException('非法操作');
        }

        let autographInfo = new AppletsAutographEntity();
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
    async getAutograph(agreementId: number) {
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        const autograph = await this.appletsAutographEntity.findOne({ user: { id: appUser.userId }, agreement: { id: agreementId } });
        return autograph;
    }
    /** 更新签名 */
    async updateAutograph(param: AutographUpdateDTO) {
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ id: appUser.userId });
        let autograph = await this.appletsAutographEntity.findOne({ id: param.id }, { relations: ['user'] });
        const agreementInfo = await this.appletsAgreementEntity.findOne({ id: +param.agreementId });
        if (agreementInfo.status !== 1) {
            // 非法操作
            throw new CoolCommException('非法操作');
        }
        if (!autograph) {
            autograph = await this.appletsAutographEntity.findOne({ user: { id: appUser.userId }, agreement: { id: param.agreementId } }, { relations: ['user'] });
            if (!autograph) {
                autograph = new AppletsAutographEntity();
                autograph.user = userInfo;
                autograph.agreement = agreementInfo;
            }
            autograph.content = param.content;
        }
        if (autograph.user.id !== Number(appUser.userId)) {
            throw new CoolCommException('非法操作');
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
            .andWhere(
                new Brackets((qb) => {
                    if (agreementId) {
                        qb.where('a.agreementId = :agreementId', { agreementId: agreementId });
                    }
                })
            )
            .leftJoinAndSelect('a.user', 'user', 'user.id = a.userId')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort })
            .getManyAndCount();
        return {
            list: result[0].map((it, index, arr) => {
                it.userName = it?.user?.nickName || '';
                return it;
            }),
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
}
