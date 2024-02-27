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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvY29uZmlnLnByb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxrQkFBZSxDQUFDLE9BQW1CLEVBQUUsRUFBRTtJQUNuQyxNQUFNLE1BQU0sR0FBRyxFQUFtQixDQUFDO0lBRW5DLE1BQU0sQ0FBQyxHQUFHLEdBQUc7UUFDVCxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsTUFBTTtRQUNoQixnQ0FBZ0M7UUFDaEMsV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTztRQUNQLE9BQU8sRUFBRSxLQUFLO1FBQ2QsTUFBTTtRQUNOLE9BQU8sRUFBRSxVQUFVO1FBQ25CLEtBQUs7UUFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztLQUM1QixDQUFDO0lBRUYsTUFBTSxDQUFDLE1BQU0sR0FBRztRQUNaLFVBQVUsRUFBRTtZQUNSLFlBQVksRUFBRSxPQUFPO1NBQ3hCO0tBQ0osQ0FBQztJQUVGLFNBQVM7SUFDVCxNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1YsYUFBYTtRQUNiLE1BQU0sRUFBRSxLQUFLO1FBQ2IsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsV0FBVztZQUNqQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FDcUIsQ0FBQztJQUUzQixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUMifQ==