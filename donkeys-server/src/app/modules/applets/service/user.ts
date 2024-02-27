import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, ICoolCache, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { AppletsUserEntity } from '../entity/user';
import { UserRoleDTO } from '../dto/userRole';
import * as _ from 'lodash';
/* 微信小程序用户 */
@Provide()
export class AppletsUserService extends BaseService {
    @InjectEntityModel(AppletsUserEntity)
    appletsUserEntity: Repository<AppletsUserEntity>;

    @Inject('cool:cache')
    coolCache: ICoolCache;

    /**
     * 修改权限
     * @param query
     */
    async role(userParams: UserRoleDTO) {
        const userInfo = await this.appletsUserEntity.findOne({ id: userParams.id });
        if (!userInfo) {
            throw new CoolCommException('用户不存在');
        }
        userInfo.role = userParams.role;
        await this.coolCache.set(`applets:role:${userInfo.id}`, userInfo.role);
        await this.appletsUserEntity.save(userInfo);
    }

    /**
     * 用户信息
     * @param query
     */
    async info(id: any) {
        let userInfo = await this.appletsUserEntity
            .createQueryBuilder('c')
            .where('1 = 1')
            .andWhere('c.id = :id', { id })
            .loadRelationCountAndMap('c.collectCount', 'c.collects')
            .loadRelationCountAndMap('c.historyCount', 'c.historys')
            .getOne();
        return userInfo;
    }
    async infoByApp() {
        const appUser = this.ctx.appUser;
        if (!appUser) throw new CoolCommException('未知错误');
        let userInfo = await this.appletsUserEntity
            .createQueryBuilder('c')
            .where('1 = 1')
            .andWhere('c.openId = :openId', { openId: appUser.openId })
            .loadRelationCountAndMap('c.collectCount', 'c.collects')
            .loadRelationCountAndMap('c.historyCount', 'c.historys')
            .getOne();
        return userInfo;
    }
}
