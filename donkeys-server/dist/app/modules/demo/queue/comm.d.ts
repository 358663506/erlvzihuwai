import { IMidwayWebApplication } from '@midwayjs/web';
import { BaseCoolQueue } from '@cool-midway/queue';
/**
 * 普通队列
 */
export declare class DemoCommQueue extends BaseCoolQueue {
    app: IMidwayWebApplication;
    data(job: any, done: any): Promise<void>;
}
