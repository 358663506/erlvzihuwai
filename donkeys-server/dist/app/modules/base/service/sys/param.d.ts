import { BaseService, ICoolCache } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { BaseSysParamEntity } from '../../entity/sys/param';
/**
 * 参数配置
 */
export declare class BaseSysParamService extends BaseService {
    baseSysParamEntity: Repository<BaseSysParamEntity>;
    coolCache: ICoolCache;
    /**
     * 根据key获得对应的参数
     * @param key
     */
    dataByKey(key: any): Promise<any>;
    /**
     * 根据key获得对应的网页数据
     * @param key
     */
    htmlByKey(key: any): Promise<string>;
    /**
     * 重新初始化缓存
     */
    modifyAfter(): Promise<void>;
}
