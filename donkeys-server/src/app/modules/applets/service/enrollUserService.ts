import { Provide } from '@midwayjs/decorator';
import {BaseService, CoolCommException} from '@cool-midway/core';
import { EnrollUserEntity } from '../entity/enrollUser';
import {InjectEntityModel} from "@midwayjs/orm";

import {Brackets, Repository} from "typeorm";
import * as R from "ramda";



/* 报名活动 */
@Provide()
export class EnrollUserService extends BaseService {

    @InjectEntityModel(EnrollUserEntity)
    enrollUserEntity: Repository<EnrollUserEntity>;




    /**
     * 根据活动查询成员
     * @param param
     */
    async page(query) {
        const { size = 15, page = 1, sort } = query;
        // 查询用户
        let result = await this.enrollUserEntity
            .createQueryBuilder('a')
            .where('1 = 1')
            .andWhere('a.enroll_id = :enroll_id', { enroll_id: query.enroll_id })
            .andWhere(
                new Brackets((qb) => {
                    if (!R.isNil(query.status)) {
                        if (query.status != -1) {
                            // 小程序用户传 -1 可以查询全部
                            qb.where('a.status = :status', { status: query.status });
                        }
                    }
                })
            )
            .andWhere(
                new Brackets((qb) => {
                    if (query.name) {
                        qb.where('a.name LIKE :name', { name: `%${query.name}%` });
                    }
                })
            )
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort || 'DESC' })
            .getManyAndCount();
        return {
            list: result[0],
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
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
    public async status(id: number) {
        const postInfo = await this.enrollUserEntity.findOne({ id: id });
        if (!postInfo) {
            throw new CoolCommException('数据不存在');
        }
        if(postInfo.status==1){
            postInfo.status=0;
        }else{
            postInfo.status=1;
        }
        await this.enrollUserEntity.save(postInfo);
    }

    /**
     * 根据活动获取成员信息
     * @param enrollId
     * @param openId
     */
    // public async getByEnrollId(openId:string,enrollId: number){
    //
    //     let userInfo = await this.enrollUserEntity
    //         .createQueryBuilder('c')
    //         .where('c.openid = :openId', { openId:openId})
    //         .andWhere('c.enroll_id = :enrollId',{enrollId: enrollId})
    //         //.where('c.openid = :openId and c.enroll_id = :enrollId', { openId: openId, enrollId: enrollId })
    //         //.loadRelationCountAndMap('c.collectCount', 'c.collects')
    //         .limit(1) // 添加 LIMIT 1
    //         .getOne();
    //
    //     return userInfo;
    // }


    public async getByEnrollId(openId: string, enrollId: number) {

        let userInfo = await this.enrollUserEntity
            .createQueryBuilder('c')
            .where('c.openid = :openId and c.enroll_id = :enrollId', { openId ,enrollId})
            .limit(1) // 添加 LIMIT 1
            .getOne();

        return userInfo;
    }


    /**
     * 获取已填的身份证信息
     * @param enrollId
     * @param openId
     */
    public async getIdCardByOpenId(openId:string){

        let userInfo = await this.enrollUserEntity
            .createQueryBuilder('c')
            .where('c.openid = :openId and c.id_card is not null', { openId:openId })
            //.loadRelationCountAndMap('c.collectCount', 'c.collects')
            .limit(1) // 添加 LIMIT 1
            .getOne();

        return userInfo;
    }

}
