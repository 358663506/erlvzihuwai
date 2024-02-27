import { Context } from 'egg';
import { BaseController } from '@cool-midway/core';
/**
 * 欢迎界面
 */
export declare class WelcomeController extends BaseController {
    ctx: Context;
    welcome(): Promise<void>;
}
