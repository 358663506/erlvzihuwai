import { BaseController, CoolEventManager } from '@cool-midway/core';
/**
 * 事件
 */
export declare class DemoEventController extends BaseController {
    coolEventManager: CoolEventManager;
    /**
     * 发送事件
     */
    send(): Promise<void>;
}
