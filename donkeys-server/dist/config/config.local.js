"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    config.orm = {
        type: 'mysql',
        host: '127.0.0.1',
        // host: '124.221.68.99',
        port: 3306,
        username: 'root',
        password: '123456',
        // password: 'Sj15221198655@',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL2NvbmZpZy5sb2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ25DLE1BQU0sTUFBTSxHQUFHLEVBQW1CLENBQUM7SUFFbkMsTUFBTSxDQUFDLEdBQUcsR0FBRztRQUNULElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFdBQVc7UUFDakIseUJBQXlCO1FBQ3pCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsOEJBQThCO1FBQzlCLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLGdDQUFnQztRQUNoQyxXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPO1FBQ1AsT0FBTyxFQUFFLElBQUk7UUFDYixNQUFNO1FBQ04sT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLO1FBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7S0FDNUIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxNQUFNLEdBQUc7UUFDWixVQUFVLEVBQUU7WUFDUixZQUFZLEVBQUUsTUFBTTtTQUN2QjtLQUNKLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUMifQ==