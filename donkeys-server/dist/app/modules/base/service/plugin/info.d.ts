import { BaseService, ICoolCache, CoolPlugin } from '@cool-midway/core';
/**
 * 插件
 */
export declare class BasePluginInfoService extends BaseService {
    coolPlugin: CoolPlugin;
    coolCache: ICoolCache;
    /**
     * 列表
     */
    list(keyWord: any): Promise<import("@cool-midway/core").CorePlugin[]>;
    /**
     * 配置
     */
    config(namespace: string, config: any): Promise<void>;
    /**
     * 获得配置信息
     * @param namespace
     */
    getConfig(namespace: string): Promise<any>;
    /**
     * 是否启用插件
     * @param namespace
     * @param enable
     */
    enable(namespace: string, enable: number): Promise<void>;
}
