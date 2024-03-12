import { Provide } from '@midwayjs/decorator';
import {BaseService, CoolCommException} from '@cool-midway/core';
import { EnrollUserEntity } from '../entity/enrollUser';
import {InjectEntityModel} from "@midwayjs/orm";

import {Repository} from "typeorm";
import {PostStatusDTO} from "../dto/postStatus";


/* 报名活动 */
@Provide()
export class EnrollUserService extends BaseService {

    @InjectEntityModel(EnrollUserEntity)
    enrollUserEntity: Repository<EnrollUserEntity>;

    /**
     * 新增
     * @param param
     */
    async add(param) {
        // 判断是否可以新增

        await this.enrollUserEntity.save(param);
        return param;
    }



    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        // 判断是否可以修改

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

    /**
     * 修改状态
     * @param post
     */
    public async status(post: PostStatusDTO) {
        const postInfo = await this.enrollUserEntity.findOne({ id: post.id });
        if (!postInfo) {
            throw new CoolCommException('数据不存在');
        }
        postInfo.status = post.status;
        await this.enrollUserEntity.save(postInfo);
    }
}
