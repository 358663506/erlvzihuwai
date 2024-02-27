import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 回复
 */
export class AddReplyDTO {
    // 文章 id
    @Rule(RuleType.number().required())
    postId: number;

    @Rule(RuleType.number())
    replyId: number;

    // 评论/回复内容
    @Rule(RuleType.string().required())
    content: string;
}

/**
 * 查询回复
 */
export class PageReplyByPostDTO {
    // 文章 id
    @Rule(RuleType.number().required())
    postId: number;
    //
    @Rule(RuleType.number().default(1))
    page: number;
    @Rule(RuleType.number().default(15))
    size: number;
    @Rule(RuleType.string().default('DESC'))
    sort: 'ASC' | 'DESC';
    // ...
}
