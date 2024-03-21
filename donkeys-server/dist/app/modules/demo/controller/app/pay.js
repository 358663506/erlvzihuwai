"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoPayController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const xml2js_1 = require("xml2js");
/**
 * 支付示例
 */
let DemoPayController = class DemoPayController extends core_1.BaseController {
    /**
     * 微信扫码支付
     */
    async wx() {
        const orderNum = await this.wxPay.createOrderNum();
        const data = await this.wxPay.getInstance().unifiedOrder({
            out_trade_no: orderNum,
            body: '测试微信支付',
            total_fee: 1,
            trade_type: 'NATIVE',
            product_id: 'test001'
        });
        return this.ok(data);
    }
    /**
     * 微信支付通知回调
     */
    async wxNotify() {
        let data = '';
        this.ctx.req.setEncoding('utf8');
        this.ctx.req.on('data', (chunk) => {
            data += chunk;
        });
        const results = await new Promise((resolve, reject) => {
            this.ctx.req.on('end', () => {
                xml2js_1.parseString(data, { explicitArray: false }, async (err, json) => {
                    if (err) {
                        return reject('success');
                    }
                    const checkSign = await this.wxPay.signVerify(json.xml);
                    if (checkSign && json.xml.result_code === 'SUCCESS') {
                        // 处理业务逻辑
                        console.log('微信支付成功', json.xml);
                        return resolve(true);
                    }
                    return resolve(false);
                });
            });
        });
        if (results) {
            this.ctx.body = '<xml><return_msg>OK</return_msg><return_code>SUCCESS</return_code></xml>';
        }
    }
    /**
     * 支付宝app支付
     * @returns
     */
    async alipay() {
        const orderNum = await this.aliPay.createOrderNum();
        // app支付
        const params = await this.aliPay.getInstance().appPay({
            subject: '测试商品',
            body: '测试商品描述',
            outTradeId: orderNum,
            timeout: '10m',
            amount: '10.00',
            goodsType: '0'
        });
        return this.ok(params);
    }
    /**
     * 支付宝支付回调
     */
    async aliNotify(body) {
        const { trade_status, out_trade_no } = body;
        const check = await this.aliPay.signVerify(body);
        if (check && trade_status === 'TRADE_SUCCESS') {
            // 处理逻辑
            console.log('支付宝支付成功', out_trade_no);
        }
        this.ctx.body = 'success';
    }
};
__decorate([
    decorator_1.Inject('wxpay:sdk'),
    __metadata("design:type", Object)
], DemoPayController.prototype, "wxPay", void 0);
__decorate([
    decorator_1.Inject('alipay:sdk'),
    __metadata("design:type", Object)
], DemoPayController.prototype, "aliPay", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], DemoPayController.prototype, "ctx", void 0);
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], DemoPayController.prototype, "app", void 0);
__decorate([
    decorator_1.Post('/wx'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "wx", null);
__decorate([
    decorator_1.Post('/wxNotify'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "wxNotify", null);
__decorate([
    decorator_1.Post('/alipay'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "alipay", null);
__decorate([
    decorator_1.Post('/aliNotify'),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "aliNotify", null);
DemoPayController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], DemoPayController);
exports.DemoPayController = DemoPayController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL3BheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBNEU7QUFHNUUsNENBQW1FO0FBRW5FLG1DQUFxQztBQUdyQzs7R0FFRztBQUdILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEscUJBQWM7SUFlakQ7O09BRUc7SUFFSCxLQUFLLENBQUMsRUFBRTtRQUNKLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3JELFlBQVksRUFBRSxRQUFRO1lBQ3RCLElBQUksRUFBRSxRQUFRO1lBQ2QsU0FBUyxFQUFFLENBQUM7WUFDWixVQUFVLEVBQUUsUUFBUTtZQUNwQixVQUFVLEVBQUUsU0FBUztTQUN4QixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLFFBQVE7UUFDVixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzlCLElBQUksSUFBSSxLQUFLLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUN4QixvQkFBVyxDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO29CQUM1RCxJQUFJLEdBQUcsRUFBRTt3QkFDTCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDNUI7b0JBQ0QsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hELElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTt3QkFDakQsU0FBUzt3QkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2hDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN4QjtvQkFDRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRywwRUFBMEUsQ0FBQztTQUM5RjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwRCxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNsRCxPQUFPLEVBQUUsTUFBTTtZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFLFFBQVE7WUFDcEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsT0FBTztZQUNmLFNBQVMsRUFBRSxHQUFHO1NBQ2pCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsU0FBUyxDQUFZLElBQVM7UUFDaEMsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDNUMsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLEtBQUssSUFBSSxZQUFZLEtBQUssZUFBZSxFQUFFO1lBQzNDLE9BQU87WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0NBQ0osQ0FBQTtBQTNGRztJQURDLGtCQUFNLENBQUMsV0FBVyxDQUFDOztnREFDRjtBQUlsQjtJQURDLGtCQUFNLENBQUMsWUFBWSxDQUFDOztpREFDRDtBQUdwQjtJQURDLGtCQUFNLEVBQUU7OzhDQUNJO0FBR2I7SUFEQyxlQUFHLEVBQUU7OzhDQUNxQjtBQU0zQjtJQURDLGdCQUFJLENBQUMsS0FBSyxDQUFDOzs7OzJDQVdYO0FBTUQ7SUFEQyxnQkFBSSxDQUFDLFdBQVcsQ0FBQzs7OztpREEwQmpCO0FBT0Q7SUFEQyxnQkFBSSxDQUFDLFNBQVMsQ0FBQzs7OzsrQ0FhZjtBQU1EO0lBREMsZ0JBQUksQ0FBQyxZQUFZLENBQUM7SUFDRixXQUFBLGdCQUFJLENBQUMsZUFBRyxDQUFDLENBQUE7Ozs7a0RBUXpCO0FBN0ZRLGlCQUFpQjtJQUY3QixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLGlCQUFpQixDQThGN0I7QUE5RlksOENBQWlCIn0=