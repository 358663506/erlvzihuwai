import { Provide } from '@midwayjs/decorator';
import {BaseService, CoolCommException} from '@cool-midway/core';
import {InjectEntityModel} from "@midwayjs/orm";
import {Brackets, Repository} from "typeorm";
import * as R from "ramda";
import {AppletsMusterAddressEntity} from "../entity/muster_address";

/* 报名活动 */
@Provide()
export class MusterAddressService extends BaseService {



    @InjectEntityModel(AppletsMusterAddressEntity)
    appletsMusterAddressEntity:Repository<AppletsMusterAddressEntity>
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = null, name, status } = query;

        let result = await this.appletsMusterAddressEntity
            .createQueryBuilder('a')
            .where('1 = 1')
            .andWhere(
                new Brackets((qb) => {
                    if (!R.isNil(status)) {
                        if (status != -1) {
                            // 小程序用户传 -1 可以查询全部
                            qb.where('a.status = :status', { status: status });
                        }
                    }
                })
            )
            .andWhere(
                new Brackets((qb) => {
                    if (name) {
                        qb.where('a.name LIKE :name', { name: `%${name}%` });
                    }
                })
            )
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy(sort ? { 'a.createTime': sort } : {  'a.status': 'ASC', 'a.createTime': 'DESC' })
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


        await this.appletsMusterAddressEntity.save(param);

        return param;
    }

    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        let postInfo = await this.appletsMusterAddressEntity.findOne({ id: param.id });
        if (!postInfo) {
            throw new CoolCommException('活动不存在');
        }

        await this.appletsMusterAddressEntity.save(param);

        return param;
    }

    async deleteById(id: number) {
        let postInfo = await this.appletsMusterAddressEntity.findOne({ id: id });
        if (postInfo) {
            await this.appletsMusterAddressEntity.delete({ id });
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
        let postInfo = await this.appletsMusterAddressEntity.findOne({ id: id });
        if (!postInfo) {
            throw new CoolCommException('活动不存在');
        }
        return postInfo;
    }

    /**
     * 修改状态
     * @param post
     */
    public async status(id: number) {
        const postInfo = await this.appletsMusterAddressEntity.findOne({ id: id });
        if (!postInfo) {
            throw new CoolCommException('数据不存在');
        }
        if(postInfo.status==1){
            postInfo.status=0;
        }else{
            postInfo.status=1;
        }

        await this.appletsMusterAddressEntity.save(postInfo);
    }
}
