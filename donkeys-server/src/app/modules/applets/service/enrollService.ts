import { Provide } from '@midwayjs/decorator';
import {BaseService, CoolCommException} from '@cool-midway/core';
import {EnrollEntity} from '../entity/enroll';
import {InjectEntityModel} from "@midwayjs/orm";
import {Brackets, Repository} from "typeorm";
import * as R from "ramda";
/* 消息推送 */
@Provide()
export class EnrollService extends BaseService {


    @InjectEntityModel(EnrollEntity)
    enrollEntity: Repository<EnrollEntity>;


    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = null, title, status } = query;
        // 后台 admin 默认查全部
        const { userId } = this.ctx.admin || { userId: undefined };
        let result = await this.enrollEntity
            .createQueryBuilder('a')
            .select(['a.id', 'a.title', 'a.top', 'a.status', 'a.articleCover', 'a.visitCount', 'a.updateTime', 'a.createTime', 'a.destinationPos', 'a.departureTime'])
            .addSelect(userId ? ['a.content'] : [])
            .where('1 = 1')
            .andWhere(
                new Brackets((qb) => {
                    if (!R.isNil(status)) {
                        if (status != -1) {
                            // 小程序用户传 -1 可以查询全部
                            qb.where('a.status = :status', { status: status });
                        }
                    } else if (!userId) {
                        // 小程序用户默认不能查询全部
                        qb.where('a.status != 0');
                    }
                })
            )
            .andWhere(
                new Brackets((qb) => {
                    if (title) {
                        qb.where('a.title LIKE :title', { title: `%${title}%` });
                    }
                })
            )
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy(sort ? { 'a.createTime': sort } : { 'a.top': 'DESC', 'a.status': 'ASC', 'a.createTime': 'DESC' })
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
        await this.enrollEntity.save(param);
        // 判断有没有标签
        // await this.updateUserRole(param);
        return param;
    }

    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        let postInfo = await this.enrollEntity.findOne({ id: param.id });
        if (!postInfo) {
            throw new CoolCommException('活动不存在');
        }

        await this.enrollEntity.save(param);

        return param;
    }

    async deleteById(id: number) {
        let postInfo = await this.enrollEntity.findOne({ id: id });
        if (postInfo) {
            await this.enrollEntity.delete({ id });
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
        let postInfo = await this.enrollEntity.findOne({ id: id });
        if (!postInfo) {
            throw new CoolCommException('活动不存在');
        }
        return postInfo;
    }
}
