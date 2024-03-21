import { Provide, Inject } from '@midwayjs/decorator';
import { BaseService, ICoolCache, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Brackets, Repository } from 'typeorm';
import { AppletsPostEntity } from '../entity/post';
import { AppletsLabelEntity } from '../entity/label';
import { PostStatusDTO, PostTopDTO } from '../dto/postStatus';
import * as R from 'ramda';
import { AppletsHistoryEntity } from '../entity/history';
import { AppletsCollectEntity } from '../entity/collect';
import { AppletsReplayEntity } from '../entity/reply';
import {AppletsMusterAddressEntity} from "../entity/muster_address";
import {AppletsEnrollMusterAddressEntity} from "../entity/enroll_muster_address";

/* 发布活动 */
@Provide()
export class AppletsPostService extends BaseService {
    @InjectEntityModel(AppletsPostEntity)
    appletsPostEntity: Repository<AppletsPostEntity>;

    @InjectEntityModel(AppletsLabelEntity)
    appletsLabelEntity: Repository<AppletsLabelEntity>;

    @InjectEntityModel(AppletsHistoryEntity)
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;

    @InjectEntityModel(AppletsCollectEntity)
    appletsCollectEntity: Repository<AppletsCollectEntity>;

    @InjectEntityModel(AppletsReplayEntity)
    appletsReplayEntity: Repository<AppletsReplayEntity>;

    @Inject('cool:cache')
    coolCache: ICoolCache;


    @InjectEntityModel(AppletsMusterAddressEntity)
    appletsMusterAddressEntity:Repository<AppletsMusterAddressEntity>

    @InjectEntityModel(AppletsEnrollMusterAddressEntity)
    appletsEnrollMusterAddressEntity:Repository<AppletsEnrollMusterAddressEntity>
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = null, title, status } = query;
        // 后台 admin 默认查全部
        const { userId } = this.ctx.admin || { userId: undefined };
        let result = await this.appletsPostEntity
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
            .loadRelationCountAndMap('a.replyCount', 'a.replys')
            .loadRelationCountAndMap('a.collectCount', 'a.collects')
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
       const savedParam = await this.appletsPostEntity.save(param);
        // 判断有没有标签
        // await this.updateUserRole(param);

        if(param.addressList){

            // 使用forEach方法遍历数组
            for (const addressId of param.addressList) {
                console.log("====================>"+addressId)
                const  addressInfo = await this.appletsMusterAddressEntity.findOne({ id: addressId });

                console.log("=========addressInfo===========>"+addressInfo);
                if(addressInfo){

                    const  enrollMusterAddressEntity = new AppletsEnrollMusterAddressEntity();
                    enrollMusterAddressEntity.enroll_id= savedParam.id;
                    enrollMusterAddressEntity.muster_address_id = addressId;
                    enrollMusterAddressEntity.muster_time=addressInfo.muster_time;
                    enrollMusterAddressEntity.name = addressInfo.name;

                    console.log("====================>"+savedParam.id);
                    console.log("====================>"+addressInfo.muster_time);
                    await this.appletsEnrollMusterAddressEntity.save(enrollMusterAddressEntity);
                }

            }
        }
        return param;
    }

    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        let postInfo = await this.appletsPostEntity.findOne({ id: param.id });
        if (!postInfo) {
            throw new CoolCommException('文章不存在');
        }
        param.visitCount = postInfo.visitCount;
        await this.appletsPostEntity.save(param);

        // 修改的时候先删除
        await this.appletsEnrollMusterAddressEntity.delete({enroll_id:param.id});

        if(param.addressList){

            // 使用forEach方法遍历数组
            for (const addressId of param.addressList) {
                console.log("====================>"+addressId)
                const  addressInfo = await this.appletsMusterAddressEntity.findOne({ id: addressId });

                console.log("=========addressInfo===========>"+addressInfo);
                if(addressInfo){

                    const  enrollMusterAddressEntity = new AppletsEnrollMusterAddressEntity();
                    enrollMusterAddressEntity.enroll_id= param.id;
                    enrollMusterAddressEntity.muster_address_id = addressId;
                    enrollMusterAddressEntity.muster_time=addressInfo.muster_time;
                    enrollMusterAddressEntity.name = addressInfo.name;
                    await this.appletsEnrollMusterAddressEntity.save(enrollMusterAddressEntity);
                }

            }
        }

        // 判断有没有标签
        // await this.updateUserRole(param);
        return param;
    }

    /**
     * 根据ID获得信息
     * @param id
     */
    public async info(id) {
        if (!id) {
            throw new CoolCommException('非法操作~');
        }
        let info = await this.appletsPostEntity
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.user', 'user')
            .loadRelationCountAndMap('p.replyCount', 'p.replys')
            .loadRelationCountAndMap('p.collectCount', 'p.collects')
            .where('p.id = :id', { id })
            .getOne();
        if (!info) {
            throw new CoolCommException('文章不存在');
        }
        return info;
    }

    /**
     * 修改状态
     * @param post
     */
    public async status(post: PostStatusDTO) {
        const postInfo = await this.appletsPostEntity.findOne({ id: post.id });
        if (!postInfo) {
            throw new CoolCommException('文章不存在');
        }
        postInfo.status = post.status;
        await this.appletsPostEntity.save(postInfo);
    }

    /**
     * 修改置顶状态
     * @param post
     */
    public async top(post: PostTopDTO) {
        const postInfo = await this.appletsPostEntity.findOne({ id: post.id });
        if (!postInfo) {
            throw new CoolCommException('文章不存在');
        }
        postInfo.top = post.top;
        await this.appletsPostEntity.save(postInfo);
    }
    /**
     * 删除文章
     * @param id
     */
    async deleteById(id: number) {
        let postInfo = await this.appletsPostEntity.findOne({ id: id });
        if (postInfo) {
            await this.appletsReplayEntity.delete({ post: postInfo });
            await this.appletsHistoryEntity.delete({ post: postInfo });
            await this.appletsCollectEntity.delete({ post: postInfo });
            await this.appletsPostEntity.delete({ id });
        }
        return '';
    }
}
