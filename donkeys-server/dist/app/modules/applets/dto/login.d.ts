/**
 * 登录参数校验
 */
export declare class WeLoginDTO {
    code: string;
    signature: string;
    rawData: string;
    iv: string;
    encryptedData: string;
    openid: string;
    session_key: string;
}
/**
 * 登录参数校验
 */
export declare class WeLoginByCodeDTO {
    code: string;
}
