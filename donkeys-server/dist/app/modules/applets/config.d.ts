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
declare const _default: (app: Application) => Iconfig;
/**
 * 模块的配置
 */
export default _default;
