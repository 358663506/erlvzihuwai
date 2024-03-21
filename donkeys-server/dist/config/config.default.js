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
            port: 6379,
            //host: '127.0.0.1',
            host: '47.92.88.104',
            //password: '123456',
            password: 'Sj15221198655@',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZCQUE2QjtBQUk3QixrQkFBZSxDQUFDLE9BQW1CLEVBQUUsRUFBRTtJQUNuQyxNQUFNLE1BQU0sR0FBRyxFQUFtQixDQUFDO0lBQ25DLGtCQUFrQjtJQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7SUFFL0MsOENBQThDO0lBQzlDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXZCLHVDQUF1QztJQUN2QyxNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1YsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN4RCxpQkFBaUIsRUFBRSxVQUFVO1FBQzdCLGdCQUFnQixFQUFFLE9BQU87UUFDekIsT0FBTyxFQUFFO1lBQ0wsT0FBTyxFQUFFLFVBQVU7U0FDdEI7S0FDSixDQUFDO0lBRUYsWUFBWTtJQUNaLE1BQU0sQ0FBQyxNQUFNLEdBQUc7UUFDWixNQUFNLEVBQUUsRUFBRTtRQUNWLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztRQUMvQyxPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxLQUFLO1FBQ2Qsb0JBQW9CO1FBQ3BCLE1BQU0sRUFBRSxDQUFDO1FBQ1QsTUFBTSxFQUFFLEtBQUs7S0FDaEIsQ0FBQztJQUVGLHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIscUNBQXFDO0lBQ3JDLDJEQUEyRDtJQUMzRCxPQUFPO0lBQ1AsS0FBSztJQUVMLFNBQVM7SUFDVCxNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2QsSUFBSSxFQUFFO1lBQ0YsTUFBTSxFQUFFLEtBQUs7U0FDaEI7S0FDSixDQUFDO0lBRUYsa0JBQWtCO0lBQ2xCLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDVixhQUFhO1FBQ2IsTUFBTSxFQUFFLElBQUk7UUFDWixTQUFTO1FBQ1QsTUFBTSxFQUFFO1lBQ0osTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELE9BQU87UUFDUCxHQUFHLEVBQUUsS0FBSztRQUVWLE9BQU87UUFDUCxJQUFJLEVBQUU7WUFDRixXQUFXO1lBQ1gsSUFBSSxFQUFFLEVBQUU7U0FDWDtRQUNELE9BQU87UUFDUCxJQUFJLEVBQUU7WUFDRixvQkFBb0I7WUFDcEIsTUFBTSxFQUFFLEVBQUU7U0FDYjtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxJQUFJO1lBQ1Ysb0JBQW9CO1lBQ3BCLElBQUksRUFBQyxjQUFjO1lBQ25CLHFCQUFxQjtZQUNyQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FFcUIsQ0FBQztJQUMzQixNQUFNLENBQUMsT0FBTyxHQUFHO1FBQ2IsS0FBSyxFQUFFLG9CQUFvQjtRQUMzQixNQUFNLEVBQUUsa0NBQWtDO0tBQzdDLENBQUM7SUFDRixPQUFPO0lBQ1AsTUFBTSxDQUFDLFNBQVMsR0FBRztRQUNmLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUk7S0FDeEIsQ0FBQztJQUVGLGtCQUFrQjtJQUNsQixNQUFNLENBQUMsYUFBYSxHQUFHO1FBQ25CLGdCQUFnQixFQUFFLElBQUk7S0FDekIsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyJ9