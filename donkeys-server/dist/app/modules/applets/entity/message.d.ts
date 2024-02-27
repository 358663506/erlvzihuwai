import { BaseEntity } from '@cool-midway/core';
/**
 * 图片空间信息分类
 */
export declare class AppletsMessageEntity extends BaseEntity {
    name: string;
    masterId: number;
    authorId: number;
    postId: number;
    replyId: number;
    postTitle: string;
    replyContent: string;
    hasRead: number;
}
