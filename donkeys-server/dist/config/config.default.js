"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (appInfo) => {
    const config = {};
    // cookie sign key
    config.keys = appInfo.name + 'cool-admin-next';
    // 启用中间件 这里需要设置为 [] 否则CoolController设置的中间件也会无效
    config.middleware = [];
    // 模板渲染 用法 https://nunjucks.bootcss.com
    config.view = {
        root: [path.join(appInfo.baseDir, 'app/view')].join(','),
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.html',
        mapping: {
            '.html': 'nunjucks'
        }
    };
    // 靜態目錄及緩存設置
    config.static = {
        prefix: '',
        dir: path.join(appInfo.baseDir, '..', 'public'),
        dynamic: true,
        preload: false,
        // maxAge: 31536000,
        maxAge: 0,
        buffer: false
    };
    // 修改默认的 favicon.ico serverless 环境下无用
    // config.siteFile = {
    //   '/favicon.ico': fs.readFileSync(
    //     path.join(appInfo.baseDir, 'app/public/favicon.ico')
    //   ),
    // };
    // 关闭安全校验
    config.security = {
        csrf: {
            enable: false
        }
    };
    // cool-admin特有的配置
    config.cool = {
        // 是否初始化模块数据库
        initDB: true,
        // 全局路由前缀
        router: {
            prefix: ''
        },
        // 单点登录
        sso: false,
        // 分页配置
        page: {
            // 分页查询每页条数
            size: 15
        },
        // 文件上传
        file: {
            // 文件路径前缀 本地上传模式下 有效
            domain: ''
        },
        redis: {
            port: 16379,
            host: '127.0.0.1',
            password: '123456',
            // password: 'Sj15221198655@',
            db: 0
        }
    };
    config.applets = {
        appId: 'wxf41e69c8460d77e5',
        secret: '7dfae0d8ec84ec7864c6ae5d7795e4ed'
    };
    // 文件上传
    config.multipart = {
        fileSize: '100mb',
        mode: 'file',
        whitelist: () => true
    };
    // 将egg日志替换成midway
    config.midwayFeature = {
        replaceEggLogger: true
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvY29uZmlnLmRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw2QkFBNkI7QUFJN0Isa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQUcsRUFBbUIsQ0FBQztJQUNuQyxrQkFBa0I7SUFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0lBRS9DLDhDQUE4QztJQUM5QyxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUV2Qix1Q0FBdUM7SUFDdkMsTUFBTSxDQUFDLElBQUksR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEQsaUJBQWlCLEVBQUUsVUFBVTtRQUM3QixnQkFBZ0IsRUFBRSxPQUFPO1FBQ3pCLE9BQU8sRUFBRTtZQUNMLE9BQU8sRUFBRSxVQUFVO1NBQ3RCO0tBQ0osQ0FBQztJQUVGLFlBQVk7SUFDWixNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ1osTUFBTSxFQUFFLEVBQUU7UUFDVixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7UUFDL0MsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsS0FBSztRQUNkLG9CQUFvQjtRQUNwQixNQUFNLEVBQUUsQ0FBQztRQUNULE1BQU0sRUFBRSxLQUFLO0tBQ2hCLENBQUM7SUFFRixxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLHFDQUFxQztJQUNyQywyREFBMkQ7SUFDM0QsT0FBTztJQUNQLEtBQUs7SUFFTCxTQUFTO0lBQ1QsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNkLElBQUksRUFBRTtZQUNGLE1BQU0sRUFBRSxLQUFLO1NBQ2hCO0tBQ0osQ0FBQztJQUVGLGtCQUFrQjtJQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1YsYUFBYTtRQUNiLE1BQU0sRUFBRSxJQUFJO1FBQ1osU0FBUztRQUNULE1BQU0sRUFBRTtZQUNKLE1BQU0sRUFBRSxFQUFFO1NBQ2I7UUFDRCxPQUFPO1FBQ1AsR0FBRyxFQUFFLEtBQUs7UUFFVixPQUFPO1FBQ1AsSUFBSSxFQUFFO1lBQ0YsV0FBVztZQUNYLElBQUksRUFBRSxFQUFFO1NBQ1g7UUFDRCxPQUFPO1FBQ1AsSUFBSSxFQUFFO1lBQ0Ysb0JBQW9CO1lBQ3BCLE1BQU0sRUFBRSxFQUFFO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxXQUFXO1lBQ2pCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLDhCQUE4QjtZQUM5QixFQUFFLEVBQUUsQ0FBQztTQUNSO0tBQ3FCLENBQUM7SUFDM0IsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNiLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsTUFBTSxFQUFFLGtDQUFrQztLQUM3QyxDQUFDO0lBQ0YsT0FBTztJQUNQLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDZixRQUFRLEVBQUUsT0FBTztRQUNqQixJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO0tBQ3hCLENBQUM7SUFFRixrQkFBa0I7SUFDbEIsTUFBTSxDQUFDLGFBQWEsR0FBRztRQUNuQixnQkFBZ0IsRUFBRSxJQUFJO0tBQ3pCLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUMifQ==