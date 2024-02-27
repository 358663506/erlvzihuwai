import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 修改文件分类参数校验
 */
export class PhotoWallMoveDTO {
    // 分类 id
    @Rule(RuleType.number().required())
    classifyId: number;

    // 照片 id
    @Rule(RuleType.array().items(RuleType.number()).required().min(1))
    ids: number[];
}
