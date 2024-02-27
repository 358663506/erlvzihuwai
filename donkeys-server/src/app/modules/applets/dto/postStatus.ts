import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 修改权限参数校验
 */
export class PostStatusDTO {
    // 文章id
    @Rule(RuleType.number().required())
    id: number;

    // 文章状态
    @Rule(RuleType.number().required(), {
        required: true,
        min: 0,
        max: 99
    })
    status: 1 | 2 | 3 | 4 | 5;
}

/**
 * 修改权限参数校验
 */
export class PostTopDTO {
    // 文章id
    @Rule(RuleType.number().required())
    id: number;

    // 文章状态
    @Rule(RuleType.number().required(), {
        required: true,
        min: 0,
        max: 1
    })
    top: 1 | 0;
}
