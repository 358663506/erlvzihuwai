import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { ILogger } from '@midwayjs/logger';

/**
 * 描述
 */
@Provide()
export class TaskDemoService extends BaseService {
    @Logger()
    logger: ILogger;
    /**
     * 描述
     */
    async test() {
        // this.logger.info('我被调用了');
        console.log('\nhello: 我被调用了 \n');
        return '任务执行成功';
    }
    /**
     * hello
     */
    async helloWord() {
        this.logger.info('helloWord');
        console.log('hello');
        return '任务执行成功';
    }

    async helloWord2() {
        this.logger.info('helloWord2');
        console.log('hello');
        return '任务执行成功';
    }
}
