/**
 * 返回码
 */
export declare enum RESCODE {
    SUCCESS = 1000, // 成功
    COMMFAIL = 1001, // 无权限
    VALIDATEFAIL = 1002, // 参数校验失败
    COREFAIL = 1003, // 核心错误
    TOKEN_EXPIRED = 1004 // TOKEN 过期
}
/**
 * 返回信息
 */
export declare enum RESMESSAGE {
    SUCCESS = 'success',
    COMMFAIL = 'comm fail',
    VALIDATEFAIL = 'validate fail',
    COREFAIL = 'core fail',
    TOKEN_EXPIRED = 'Token expired'
}
/**
 * 错误提示
 */
export declare enum ERRINFO {
    NOENTITY = '\u672A\u8BBE\u7F6E\u64CD\u4F5C\u5B9E\u4F53',
    NOID = '\u67E5\u8BE2\u53C2\u6570[id]\u4E0D\u5B58\u5728',
    SORTFIELD = '\u6392\u5E8F\u53C2\u6570\u4E0D\u6B63\u786E'
}
