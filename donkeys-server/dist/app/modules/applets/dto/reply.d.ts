/**
 * 回复
 */
export declare class AddReplyDTO {
    postId: number;
    replyId: number;
    content: string;
}
/**
 * 查询回复
 */
export declare class PageReplyByPostDTO {
    postId: number;
    page: number;
    size: number;
    sort: 'ASC' | 'DESC';
}
