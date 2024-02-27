import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 修改权限参数校验
 */
export class UserRoleDTO {
    // 用户id
    @Rule(RuleType.number().required())
    id: number;

    // 角色
    @Rule(RuleType.number().required(), {
        required: true,
        min: 0,
        max: 99
    })
    role: number;
}
