import { BaseController } from '@cool-midway/core';
import { BasePluginInfoService } from '../../../service/plugin/info';
/**
 * 插件
 */
export declare class BasePluginInfoController extends BaseController {
    basePluginInfoService: BasePluginInfoService;
    /**
     * 插件列表
     */
    list(keyWord: string): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 配置
     * @param namespace
     * @param config
     */
    config(namespace: string, config: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 配置
     * @param namespace
     * @param config
     */
    getConfig(namespace: string): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 启用插件
     * @param enable
     */
    enable(namespace: string, enable: number): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
