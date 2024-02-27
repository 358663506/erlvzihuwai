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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7R0FFRztBQUNILGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxFQUFFO0lBQ2hDLE9BQU87UUFDSCxPQUFPO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPO1FBQ1AsV0FBVyxFQUFFLHFCQUFxQjtRQUNsQyxNQUFNO1FBQ04saUJBQWlCLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQztRQUM1RixpQkFBaUI7UUFDakIsR0FBRyxFQUFFO1lBQ0Qsa0JBQWtCO1lBQ2xCLE1BQU0sRUFBRSxtQkFBbUI7WUFDM0IsUUFBUTtZQUNSLEtBQUssRUFBRTtnQkFDSCxtQkFBbUI7Z0JBQ25CLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSTtnQkFDaEIscUJBQXFCO2dCQUNyQixhQUFhLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFO2FBQ2hDO1NBQ0o7S0FDWSxDQUFDO0FBQ3RCLENBQUMsQ0FBQyJ9