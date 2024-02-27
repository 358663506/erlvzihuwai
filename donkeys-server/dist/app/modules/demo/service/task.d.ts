import { BaseService } from '@cool-midway/core';
/**
 * 任务执行的demo示例
 */
export declare class DemoTaskService extends BaseService {
    /**
     * 测试任务执行
     * @param params 接收的参数 数组 [] 可不传
     */
    test(params?: []): Promise<void>;
}
