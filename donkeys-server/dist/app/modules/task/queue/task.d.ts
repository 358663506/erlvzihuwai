import { IMidwayWebApplication } from '@midwayjs/web';
import { BaseCoolQueue } from '@cool-midway/queue';
import { TaskInfoService } from '../service/info';
import { Job } from 'bullmq';
/**
 * 任务
 */
export declare abstract class TaskInfoQueue extends BaseCoolQueue {
    app: IMidwayWebApplication;
    taskInfoService: TaskInfoService;
    data(job: Job, done: any): Promise<void>;
}
