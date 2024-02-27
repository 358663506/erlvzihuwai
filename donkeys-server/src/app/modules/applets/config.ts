import { Application } from 'egg';
import { CoolConfig } from '@cool-midway/core';

export interface Iconfig extends CoolConfig {
    name: string;
    description: string;
    globalMiddlewares: string[];
    applets: {
        appId: string;
        secret: string;
    };
}
/**
 * 模块的配置
 */
export default (app: Application) => {
    return {
        // 模块名称
        name: '小程序模块',
        // 模块描述
        description: '小程序相关模块',
        // 中间件
        globalMiddlewares: ['appletsAuthorityMiddleware'],
        // jwt 生成解密token的
        jwt: {
            // 注意： 最好重新修改，防止破解
            secret: 'FOAPOFALOEQIPNNLQ',
            // token
            token: {
                // 2小时过期，需要用刷新token
                expire: 2 * 3600,
                // 15天内，如果没操作过就需要重新登录
                refreshExpire: 24 * 3600 * 15
            }
        },
        applets: {
            appId: app.config.applets.appId,
            secret: app.config.applets.secret
        }
    } as Iconfig;
};
