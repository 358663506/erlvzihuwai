import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 协议参数校验
 */
export class AgreementInfoDTO {
    // id
    @Rule(RuleType.number().required())
    id: number;
}
export class AgreementStatusDTO {
    // 协议 id
    @Rule(RuleType.number().required())
    id: number;
    // 状态
    @Rule(RuleType.number().required())
    status: 1 | 2;
}

export class AgreementQRCodeDTO {
    // id
    @Rule(RuleType.number().required())
    id: number;
}
