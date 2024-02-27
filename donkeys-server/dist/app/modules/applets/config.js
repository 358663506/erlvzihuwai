"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 模块的配置
 */
exports.default = (app) => {
    return {
        // 模块名称
        name: '小程序模块',
        // 模块描述
        description: '小程序相关模块',
        // 中间件
        globalMiddlewares: ['appletsAuthorityMiddleware'],
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
        },
        applets: {
            appId: app.config.applets.appId,
            secret: app.config.applets.secret
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQTs7R0FFRztBQUNILGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxFQUFFO0lBQ2hDLE9BQU87UUFDSCxPQUFPO1FBQ1AsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPO1FBQ1AsV0FBVyxFQUFFLFNBQVM7UUFDdEIsTUFBTTtRQUNOLGlCQUFpQixFQUFFLENBQUMsNEJBQTRCLENBQUM7UUFDakQsaUJBQWlCO1FBQ2pCLEdBQUcsRUFBRTtZQUNELGtCQUFrQjtZQUNsQixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLFFBQVE7WUFDUixLQUFLLEVBQUU7Z0JBQ0gsbUJBQW1CO2dCQUNuQixNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUk7Z0JBQ2hCLHFCQUFxQjtnQkFDckIsYUFBYSxFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRTthQUNoQztTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDL0IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU07U0FDcEM7S0FDTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyJ9