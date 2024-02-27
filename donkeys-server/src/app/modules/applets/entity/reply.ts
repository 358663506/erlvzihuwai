import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { AppletsUserEntity } from './user';
import { AppletsPostEntity } from './post';
import { BaseEntity } from '@cool-midway/core';
/**
 * 回复
 */
@EntityModel('applets_replay')
export class AppletsReplayEntity extends BaseEntity {
    @Column({ comment: '回复内容' })
    content: string;

    // 文章
    @ManyToOne(() => AppletsPostEntity, (post) => post.replys)
    post: AppletsPostEntity;

    // 谁发的?
    @ManyToOne(() => AppletsUserEntity, (user) => user.replys)
    user: AppletsUserEntity;

    // 发给谁的? 回复评论
    @ManyToOne(() => AppletsReplayEntity, (reply) => reply.replys)
    reply: AppletsReplayEntity;

    // 单前评论下的所有回复
    @OneToMany(() => AppletsReplayEntity, (reply) => reply.reply)
    replys: AppletsReplayEntity;

    @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
    status: number;
}
