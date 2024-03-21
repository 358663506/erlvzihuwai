"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
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
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcucHJvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ25DLE1BQU0sTUFBTSxHQUFHLEVBQW1CLENBQUM7SUFFbkMsTUFBTSxDQUFDLEdBQUcsR0FBRztRQUNULElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLGdDQUFnQztRQUNoQyxXQUFXLEVBQUUsS0FBSztRQUNsQixPQUFPO1FBQ1AsT0FBTyxFQUFFLEtBQUs7UUFDZCxNQUFNO1FBQ04sT0FBTyxFQUFFLFVBQVU7UUFDbkIsS0FBSztRQUNMLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDO0tBQzVCLENBQUM7SUFFRixNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ1osVUFBVSxFQUFFO1lBQ1IsWUFBWSxFQUFFLE9BQU87U0FDeEI7S0FDSixDQUFDO0lBRUYsU0FBUztJQUNULE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDVixhQUFhO1FBQ2IsTUFBTSxFQUFFLEtBQUs7UUFDYixLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxXQUFXO1lBQ2pCLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNxQixDQUFDO0lBRTNCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyJ9