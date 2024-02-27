import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { AppletsUserEntity } from './user';
import { AppletsReplayEntity } from './reply';
import { AppletsPostLablelEntity } from './post_label';
import { AppletsCollectEntity } from './collect';
import { BaseEntity } from '@cool-midway/core';
import { AppletsHistoryEntity } from './history';

/**
 * 回复
 */
@EntityModel('applets_post')
export class AppletsPostEntity extends BaseEntity {
    @Column({ comment: '文章标题' })
    title: string;

    @Column({ comment: '出发时间', nullable: true })
    departureTime: Date;

    @Column({ comment: '集合时间', nullable: true })
    collectionTime: Date;

    @Column({ comment: '出行目的地', default: '', nullable: true })
    destinationPos: string;

    @Column({ comment: '集合地点', default: '', nullable: true })
    collectionPos: string;

    @Column({ comment: '活动难度: 1-5星', default: 1, type: 'tinyint', nullable: true })
    difficulty: number;

    @Column({ comment: '风景级别: 1-5星', default: 1, type: 'tinyint', nullable: true })
    lanscapeLevel: number;

    @Column({ comment: '状态: 0隐藏 1:报名中 2:结束报名 3:活动开始 4:活动取消 5:活动结束', default: 1, type: 'tinyint' })
    status: number;

    @Column({ comment: '预收款', default: 0, nullable: true })
    advance_payments: number;

    @Column({ comment: '文章封面', default: '', nullable: true })
    articleCover: string;

    @Column({ comment: '文章描述', default: '', nullable: true })
    description: string;

    @Column({ comment: '文章内容', type: 'text' })
    content: string;

    // 作者
    @ManyToOne(() => AppletsUserEntity, (appletsUserEntity) => appletsUserEntity.posts)
    user: AppletsUserEntity;

    @Column({ comment: '置顶1:置顶，0不置顶', nullable: true, default: 0 })
    top: number;

    @Column({ comment: '锁', default: 0, nullable: true })
    lock: number;

    // 回复数
    replyCount: number;
    // 回复
    @OneToMany(() => AppletsReplayEntity, (reply) => reply.post)
    replys: AppletsReplayEntity[];

    @Column({ comment: '访问量', default: 0 })
    visitCount: number;

    // 足迹
    @OneToMany(() => AppletsHistoryEntity, (history) => history.post)
    historys: AppletsHistoryEntity[];

    // 标签 id
    @OneToMany(() => AppletsPostLablelEntity, (post_label) => post_label.post)
    labels: AppletsPostLablelEntity[];

    //标签
    labelNames: string[];

    // 收藏量
    collectCount: number;

    // 收藏
    @OneToMany(() => AppletsCollectEntity, (collect) => collect.post)
    collects: AppletsCollectEntity[];

    @Column({ comment: '文章类型:quill|mp', default: '' })
    contentType: string;

    @Column({ comment: '可以回复:1 不可以回复0', default: 0 })
    canReply: number;
}
