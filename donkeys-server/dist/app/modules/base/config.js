"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 模块的配置
 */
exports.default = (app) => {
    return {
        // 模块名称
        name: '权限管理',
        // 模块描述
        description: '基础的权限管理功能，包括登录，权限校验',
        // 中间件
        globalMiddlewares: ['baseAuthorityMiddleware', 'baseLogMiddleware', 'baseSwaggerMiddleware'],
        // jwt 生成解密token的
        jwt: {
            // 注意： 最好重新修改，防止破解
            secret: 'FOAPOFALOEQIPNNLQ',
            // token
            token: {
                // 2小时过期，需要用刷新token
                expire: 2 * 3600,
                // 15天内，如果没操作过就需要重新登录
                refreshExpire: 24 * 3600 * 15
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9iYXNlL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBOztHQUVHO0FBQ0gsa0JBQWUsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDaEMsT0FBTztRQUNILE9BQU87UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU87UUFDUCxXQUFXLEVBQUUscUJBQXFCO1FBQ2xDLE1BQU07UUFDTixpQkFBaUIsRUFBRSxDQUFDLHlCQUF5QixFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDO1FBQzVGLGlCQUFpQjtRQUNqQixHQUFHLEVBQUU7WUFDRCxrQkFBa0I7WUFDbEIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixRQUFRO1lBQ1IsS0FBSyxFQUFFO2dCQUNILG1CQUFtQjtnQkFDbkIsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJO2dCQUNoQixxQkFBcUI7Z0JBQ3JCLGFBQWEsRUFBRSxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUU7YUFDaEM7U0FDSjtLQUNZLENBQUM7QUFDdEIsQ0FBQyxDQUFDIn0=