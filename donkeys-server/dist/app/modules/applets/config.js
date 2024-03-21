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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVlBOztHQUVHO0FBQ0gsa0JBQWUsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDaEMsT0FBTztRQUNILE9BQU87UUFDUCxJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU87UUFDUCxXQUFXLEVBQUUsU0FBUztRQUN0QixNQUFNO1FBQ04saUJBQWlCLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztRQUNqRCxpQkFBaUI7UUFDakIsR0FBRyxFQUFFO1lBQ0Qsa0JBQWtCO1lBQ2xCLE1BQU0sRUFBRSxtQkFBbUI7WUFDM0IsUUFBUTtZQUNSLEtBQUssRUFBRTtnQkFDSCxtQkFBbUI7Z0JBQ25CLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSTtnQkFDaEIscUJBQXFCO2dCQUNyQixhQUFhLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFO2FBQ2hDO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSztZQUMvQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTTtTQUNwQztLQUNPLENBQUM7QUFDakIsQ0FBQyxDQUFDIn0=