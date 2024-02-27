import { Rule, RuleType } from '@midwayjs/decorator';

export class UserInfoDto {
    // 用户id
    @Rule(RuleType.number().required())
    id: number;
}
