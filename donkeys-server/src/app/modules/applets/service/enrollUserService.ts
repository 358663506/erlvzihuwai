import { Provide } from '@midwayjs/decorator';
import {BaseService, CoolCommException} from '@cool-midway/core';
import { EnrollUserEntity } from '../entity/enrollUser';
import {InjectEntityModel} from "@midwayjs/orm";

import {Repository} from "typeorm";


/* 消息推送 */
@Provide()
export class EnrollUserService extends BaseService {

    @InjectEntityModel(EnrollUserEntity)
    enrollUserEntity: Repository<EnrollUserEntity>;

    /**
     * 新增
     * @param param
     */
    async add(param) {
        await this.enrollUserEntity.save(param);
        return param;
    }



    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        let postInfo = await this.enrollUserEntity.findOne({ id: param.id });
        if (!postInfo) {
            throw new CoolCommException('活动用户不存在');
        }

        await this.enrollUserEntity.save(param);

        return param;
    }

    async deleteById(id: number) {
        let postInfo = await this.enrollUserEntity.findOne({ id: id });
        if (postInfo) {
            await this.enrollUserEntity.delete({ id });
        }
        return '';
    }

    /**
     * 根据ID获得信息
     * @param id
     */
    public async info(id) {
        if (!id) {
            throw new CoolCommException('非法操作~');
        }
        let postInfo = await this.enrollUserEntity.findOne({ id: id });
        if (!postInfo) {
            throw new CoolCommException('活动用户不存在');
        }
        return postInfo;
    }
}
