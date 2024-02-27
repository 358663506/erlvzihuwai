import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 登录参数校验
 */
export class WeLoginDTO {
    // code
    @Rule(RuleType.string().required())
    code: string;

    // signature
    @Rule(RuleType.string().required())
    signature: string;

    // rawData
    @Rule(RuleType.string().required())
    rawData: string;

    // iv
    @Rule(RuleType.string().required())
    iv: string;

    // encryptedData
    @Rule(RuleType.string().required())
    encryptedData: string;

    // 有 openId 说明登录过
    @Rule(RuleType.string())
    openid: string;

    @Rule(RuleType.string())
    session_key: string;
}

/**
 * 登录参数校验
 */
export class WeLoginByCodeDTO {
    // code
    @Rule(RuleType.string().required())
    code: string;
}
