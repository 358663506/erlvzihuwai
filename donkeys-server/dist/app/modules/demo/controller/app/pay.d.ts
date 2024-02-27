import { IMidwayWebApplication } from '@midwayjs/web';
import { Context } from 'egg';
import { BaseController } from '@cool-midway/core';
import { ICoolWxPay } from '@cool-midway/wxpay';
import { ICoolAliPay } from '@cool-midway/alipay';
/**
 * 支付示例
 */
export declare class DemoPayController extends BaseController {
    wxPay: ICoolWxPay;
    aliPay: ICoolAliPay;
    ctx: Context;
    app: IMidwayWebApplication;
    /**
     * 微信扫码支付
     */
    wx(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 微信支付通知回调
     */
    wxNotify(): Promise<void>;
    /**
     * 支付宝app支付
     * @returns
     */
    alipay(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 支付宝支付回调
     */
    aliNotify(body: any): Promise<void>;
}
