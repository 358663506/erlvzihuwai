import { CoolConfig } from '@cool-midway/core';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    config.orm = {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'Sj15221198655@',
        database: 'cool',
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: false,
        // 打印日志
        logging: false,
        // 字符集
        charset: 'utf8_bin',
        // 驱动
        driver: require('mysql2')
    };

    config.logger = {
        coreLogger: {
            consoleLevel: 'ERROR'
        }
    };

    // cool配置
    config.cool = {
        // 是否初始化模块数据库
        initDB: false,
        redis: {
            port: 16379,
            host: '127.0.0.1',
            password: 'Sj15221198655@',
            db: 0
        }
    } as unknown as CoolConfig;

    return config;
};
