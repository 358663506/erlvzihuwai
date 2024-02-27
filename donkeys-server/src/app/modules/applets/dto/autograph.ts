import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 协议参数校验
 */
export class AutographInfoDTO {
    // id
    @Rule(RuleType.number().required())
    id: number;
}
export class AutographByAgreeDTO {
    // 签名 id
    @Rule(RuleType.number().required())
    agreementId: number;
}
export class AutographAddDTO {
    // id
    @Rule(RuleType.number().required())
    agreementId: number;
    // 签名内容
    @Rule(RuleType.string().required())
    content: string;
}

export class AutographUpdateDTO {
    // id
    @Rule(RuleType.number().required())
    id: number;
    // 协议 id
    agreementId: number;
    // 签名内容
    @Rule(RuleType.string().required())
    content: string;
}

export class AutographDelDTO {
    // id
    @Rule(RuleType.number().required())
    id: number;
}
