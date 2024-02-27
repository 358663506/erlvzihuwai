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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9jb250cm9sbGVyL2FwcC9wYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTRFO0FBRzVFLDRDQUFtRTtBQUVuRSxtQ0FBcUM7QUFHckM7O0dBRUc7QUFHSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLHFCQUFjO0lBZWpEOztPQUVHO0lBRUgsS0FBSyxDQUFDLEVBQUU7UUFDSixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNyRCxZQUFZLEVBQUUsUUFBUTtZQUN0QixJQUFJLEVBQUUsUUFBUTtZQUNkLFNBQVMsRUFBRSxDQUFDO1lBQ1osVUFBVSxFQUFFLFFBQVE7WUFDcEIsVUFBVSxFQUFFLFNBQVM7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxRQUFRO1FBQ1YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5QixJQUFJLElBQUksS0FBSyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFD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