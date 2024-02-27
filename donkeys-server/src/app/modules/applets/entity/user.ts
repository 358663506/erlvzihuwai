import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, Index, OneToMany } from 'typeorm';
import { AppletsPostEntity } from './post';
import { AppletsReplayEntity } from './reply';
import { AppletsCollectEntity } from './collect';
import { AppletsHistoryEntity } from './history';
import { AppletsAutographEntity } from './autograph';
/**
 * 小程序用户
 */
@EntityModel('applets_user')
export class AppletsUserEntity extends BaseEntity {
    @Column({ comment: '用户名', length: 100 })
    username: string;

    @Column({ comment: '密码', nullable: true, default: '' })
    password: string;

    @Column({ comment: '昵称/微信昵称', nullable: true, default: '' })
    nickName: string;

    @Index({ unique: true })
    @Column({ comment: '微信授权 id', nullable: true })
    openId: string;

    @Column({ comment: '头像', nullable: true, default: '' })
    avatarUrl: string;

    @Column({ comment: '性别 0:无 1:男 2:女', type: 'tinyint', default: 0 })
    gender: number;

    @Column({ comment: '城市', nullable: true, default: '' })
    city: string;

    @Column({ comment: '省', nullable: true, default: '' })
    province: string;

    @Column({ comment: '国籍', nullable: true, default: '' })
    country: string;

    @Column({ comment: 'UNIONID', nullable: true, default: '' })
    unionId: string;

    @Column({ comment: '位置', nullable: true, default: '' })
    location: string;

    @Column({ comment: '角色 0:管理员 1:会员 99:普通用户', type: 'tinyint', default: 99 })
    role: number;

    @Index()
    @Column({ comment: '手机', nullable: true, length: 20, default: '' })
    phone: string;

    @Column({ comment: '邮箱', nullable: true, default: '' })
    email: string;

    // 文章数量
    postCount: number;
    // 我的文章列表
    @OneToMany(() => AppletsPostEntity, (post) => post.user)
    posts: AppletsPostEntity[];

    // 回复数量
    replyCount: number;

    // 我回复的
    @OneToMany(() => AppletsReplayEntity, (reply) => reply.user)
    replys: AppletsReplayEntity[];

    // 收藏文章数量
    collectCount: number;

    // 收藏
    @OneToMany(() => AppletsCollectEntity, (collect) => collect.user)
    collects: AppletsCollectEntity[];

    // 足迹数量
    historyCount: number;

    // 足迹
    @OneToMany(() => AppletsHistoryEntity, (history) => history.user)
    historys: AppletsHistoryEntity[];

    @Column({ comment: 'accessToken', nullable: true, default: '' })
    accessToken: string;

    @Column({ comment: 'socketId', nullable: true, default: '' })
    socketId: string;

    @Column({ comment: '备注', nullable: true, default: '' })
    remark: string;

    // 我的签名
    @OneToMany(() => AppletsAutographEntity, (autograph) => autograph.agreement)
    autographs: AppletsAutographEntity[];
}
