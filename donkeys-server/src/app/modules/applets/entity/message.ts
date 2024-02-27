import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 图片空间信息分类
 */
@EntityModel('applets_message')
export class AppletsMessageEntity extends BaseEntity {
    @Column({ comment: '类别名称' })
    name: string;

    @Column({ comment: '给谁的？' })
    masterId: number;

    @Column({ comment: '谁发的？' })
    authorId: number;

    @Column({ comment: '文章ID' })
    postId: number;

    @Column({ comment: '回复id' })
    replyId: number;

    @Column({ comment: '文章标题', nullable: true })
    postTitle: string;

    @Column({ comment: '回复内容', default: '' })
    replyContent: string;

    @Column({ comment: '是否已读 1:已读 0:未读', default: 0 })
    hasRead: number;
}
