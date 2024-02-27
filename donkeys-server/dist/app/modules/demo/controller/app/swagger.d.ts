import { BaseController } from '@cool-midway/core';
/**
 * swagger
 */
export declare class DemoSwaggerController extends BaseController {
    hello(name: string, age: number, desc: string): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
