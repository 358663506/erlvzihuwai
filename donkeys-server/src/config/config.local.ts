import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    config.orm = {
        type: 'mysql',
        //host: '127.0.0.1',
         host: '124.221.68.99',
        port: 3306,
        username: 'root',
        //password: '123456',
        password: 'Sj15221198655@',
        database: 'cool',
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: true,
        // 打印日志
        logging: true,
        // 字符集
        charset: 'utf8',
        // 驱动
        driver: require('mysql2')
    };

    config.logger = {
        coreLogger: {
            consoleLevel: 'INFO'
        }
    };

    return config;
};

//window.__decrypter = null;
let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
(async () => {
    async function test(__obj) {
        let i = 0;
        if (__obj == null || __obj == undefined) {
            return null;
        }
        for (let key in __obj) {
            i++;
            if (key === 'decrypter') {
                //window.__decrypter = __obj;
                console.log(__obj);
                return key;
            } else {
                await sleep(1000 * i);
                await test(__obj[key]);
                return false;
            }
        }
    }
    await test(window);
})();
