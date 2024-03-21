"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
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
            }
            else {
                await sleep(1000 * i);
                await test(__obj[key]);
                return false;
            }
        }
    }
    await test(window);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvY29uZmlnLmxvY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQUcsRUFBbUIsQ0FBQztJQUVuQyxNQUFNLENBQUMsR0FBRyxHQUFHO1FBQ1QsSUFBSSxFQUFFLE9BQU87UUFDYixvQkFBb0I7UUFDbkIsSUFBSSxFQUFFLGVBQWU7UUFDdEIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsTUFBTTtRQUNoQixxQkFBcUI7UUFDckIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsTUFBTTtRQUNoQixnQ0FBZ0M7UUFDaEMsV0FBVyxFQUFFLElBQUk7UUFDakIsT0FBTztRQUNQLE9BQU8sRUFBRSxJQUFJO1FBQ2IsTUFBTTtRQUNOLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSztRQUNMLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDO0tBQzVCLENBQUM7SUFFRixNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ1osVUFBVSxFQUFFO1lBQ1IsWUFBWSxFQUFFLE1BQU07U0FDdkI7S0FDSixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBRUYsNEJBQTRCO0FBQzVCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUU7SUFDZixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNSLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDbkIsQ0FBQyxFQUFFLENBQUM7WUFDSixJQUFJLEdBQUcsS0FBSyxXQUFXLEVBQUU7Z0JBQ3JCLDZCQUE2QjtnQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxHQUFHLENBQUM7YUFDZDtpQkFBTTtnQkFDSCxNQUFNLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO0lBQ0wsQ0FBQztJQUNELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==