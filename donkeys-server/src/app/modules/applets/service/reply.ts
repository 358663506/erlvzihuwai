import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { AddReplyDTO, PageReplyByPostDTO } from '../dto/reply';
import { AppletsPostEntity } from '../entity/post';
import { InjectEntityModel } from '@midwayjs/orm';
import { Brackets, Repository } from 'typeorm';
import { AppletsUserEntity } from '../entity/user';
import { AppletsReplayEntity } from '../entity/reply';
import * as R from 'ramda';

/* 回复信息 */
@Provide()
export class AppletsReplyService extends BaseService {
    @InjectEntityModel(AppletsPostEntity)
    appletsPostEntity: Repository<AppletsPostEntity>;

    @InjectEntityModel(AppletsUserEntity)
    appletsUserEntity: Repository<AppletsUserEntity>;

    @InjectEntityModel(AppletsReplayEntity)
    appletsReplayEntity: Repository<AppletsReplayEntity>;
    /**
     * 回复
     * @param param
     */
    async add(param: AddReplyDTO) {
        throw new CoolCommException('非法操作！');
        // 查询用户
        const userInfo = await this.appletsUserEntity.findOne({ id: this.ctx.appUser.userId });
        // 查询文章
        let postInfo = await this.appletsPostEntity.findOne({ id: param.postId });
        if (!postInfo) {
            throw new CoolCommException('文章不存在');
        }
        // 添加到评论
        let reply = new AppletsReplayEntity();
        reply.content = param.content;
        reply.post = postInfo;
        reply.user = userInfo;
        if (userInfo.role < 3 && param.replyId) {
            // 回复评论
            reply.reply = await this.appletsReplayEntity.findOne({ id: param.replyId });
        }
        await this.appletsReplayEntity.save(reply);
        // 部分数据返回
        reply.post = null;
        let user = R.pick(['nickName', 'avatarUrl', 'id'], reply.user) as AppletsUserEntity;
        reply.user = user;
        return reply;
    }
    /* 分页查询 */
    async page(query: PageReplyByPostDTO) {
        const { size, page, sort } = query;
        let result = await this.appletsReplayEntity
            .createQueryBuilder('c')
            .select([
                'c.id',
                'c.createTime',
                'c.updateTime',
                'c.content',
                'user.id',
                'user.nickName',
                'user.avatarUrl',
                'replysuser.id',
                'replysuser.nickName',
                'replysuser.avatarUrl'
            ])
            .where('c.replyId IS NULL')
            .andWhere(
                new Brackets((qb) => {
                    if (query.postId) {
                        qb.where('c.postId = :postId', { postId: query.postId });
                    }
                })
            )
            .leftJoin('c.user', 'user')
            .leftJoinAndSelect('c.replys', 'replys', 'replys.replyId = c.id')
            .leftJoin('replys.user', 'replysuser')
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'c.createTime': sort || 'DESC', 'replys.createTime': 'DESC' })
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
}
