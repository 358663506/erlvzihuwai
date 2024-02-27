import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 收藏参数校验
 */
export class CollectDTO {
    // 文章 id
    @Rule(RuleType.number())
    postId: number;
    // 照片墙 id
    @Rule(RuleType.number())
    photoWallTypeId: number;
}

export class DelCollectDTO {
    // 收藏 id
    @Rule(RuleType.number().required())
    id: number;
}
