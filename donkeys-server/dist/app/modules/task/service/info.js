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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInfoService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const info_1 = require("../entity/info");
const log_1 = require("../entity/log");
const _ = require("lodash");
const utils_1 = require("../../../comm/utils");
const task_1 = require("../queue/task");
/**
 * 任务
 */
let TaskInfoService = class TaskInfoService extends core_1.BaseService {
    /**
     * 停止任务
     * @param id
     */
    async stop(id) {
        const task = await this.taskFindOne(id);
        if (task) {
            const result = await this.taskInfoQueue.getRepeatableJobs();
            const job = _.find(result, { id: task.id + '' });
            if (job) {
                await this.taskInfoQueue.removeRepeatableByKey(job.key);
            }
            task.status = 0;
            await this.taskUpdate(task.id, task);
            await this.updateNextRunTime(task.id);
        }
    }
    /**
     * 开始任务
     * @param id
     * @param type
     */
    async start(id, type) {
        const task = await this.taskFindOne(id);
        task.status = 1;
        if (type) {
            task.type = type;
        }
        await this.addOrUpdate(task);
    }
    /**
     * 手动执行一次
     * @param id
     */
    async once(id) {
        const task = await this.taskInfoEntity.findOne({ id });
        if (task) {
            await this.taskInfoQueue.add({
                ...task,
                isOnce: true
            }, {
                jobId: task.id.toString(),
                removeOnComplete: true,
                removeOnFail: true
            });
        }
    }
    /**
     * 检查任务是否存在
     * @param jobId
     */
    async exist(jobId) {
        const result = await this.taskInfoQueue.getRepeatableJobs();
        const ids = result.map((e) => {
            return e.id;
        });
        return ids.includes(jobId.toString());
    }
    /**
     * 新增或修改
     * @param params
     */
    async addOrUpdate(params) {
        let repeatConf;
        await this.getOrmManager().transaction(async (transactionalEntityManager) => {
            if (params.taskType === 0) {
                params.limit = null;
                params.every = null;
            }
            else {
                params.cron = null;
            }
            await transactionalEntityManager.save(info_1.TaskInfoEntity, params);
            await this.coolCache.set(`admin:__task:${params.id}`, JSON.stringify(params));
            if (params.status === 1) {
                const exist = await this.exist(params.id);
                if (exist) {
                    this.stop(params.id);
                }
                const { every, limit, startDate, endDate, cron } = params;
                const repeat = {
                    every,
                    limit,
                    jobId: params.id,
                    startDate,
                    endDate,
                    cron
                };
                await this.utils.removeEmptyP(repeat);
                const result = await this.taskInfoQueue.add(params, {
                    jobId: params.id,
                    removeOnComplete: true,
                    removeOnFail: true,
                    repeat
                });
                if (!result) {
                    throw new Error('任务添加失败，请检查任务配置');
                }
                // await transactionalEntityManager.update(TaskInfoEntity, params.id, {
                //   jobId: opts.jobId,
                // });
                repeatConf = result.opts;
            }
        });
        if (params.status === 1) {
            this.utils.sleep(1000);
            await this.updateNextRunTime(params.id);
            let info = await this.taskFindOne(params.id);
            await this.taskUpdate(params.id, { ...info, repeatConf: JSON.stringify(repeatConf.repeat) });
        }
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            const task = await this.taskFindOne(id);
            const exist = await this.exist(task.id);
            if (exist) {
                this.stop(task.id);
            }
            await this.taskDel(id);
            await this.taskInfoEntity.delete({ id });
            await this.taskLogEntity.delete({ taskId: id });
        }
    }
    /**
     * 任务日志
     * @param query
     */
    async log(query) {
        const { id, status } = query;
        return await this.sqlRenderPage(`
      SELECT
          a.*,
          b.NAME AS taskName
      FROM
      task_log a
      JOIN task_info b ON a.taskId = b.id
      where 1=1
      ${this.setSql(id, 'and a.taskId = ?', [id])}
      ${this.setSql(status, 'and a.status = ?', [status])}
      `, query);
    }
    /**
     * 保存任务记录，成功任务每个任务保留最新20条日志，失败日志不会删除
     * @param task
     * @param status
     * @param detail
     */
    async record(task, status, detail) {
        await this.taskLogEntity.save({
            taskId: task.id,
            status,
            detail: detail || ''
        });
        await this.nativeQuery(`DELETE a
      FROM
      task_log a,
          ( SELECT id FROM task_log where taskId = ? AND status = 1 ORDER BY id DESC LIMIT ?, 1 ) b
      WHERE
      a.taskId = ? AND
      a.status = 1 AND
      a.id < b.id`, [task.id, 19, task.id]); // 日志保留最新的20条
    }
    /**
     * 初始化任务
     */
    async initTask() {
        const runningTasks = await this.taskInfoEntity.find({ status: 1 });
        if (!_.isEmpty(runningTasks)) {
            for (const task of runningTasks) {
                const job = await this.exist(task.id); // 任务已存在就不添加
                if (!job) {
                    this.logger.info(`init task ${task.name}`);
                    await this.addOrUpdate(task);
                }
            }
        }
    }
    /**
     * 任务ID
     * @param jobId
     */
    async getNextRunTime(jobId) {
        let nextRunTime;
        const result = await this.taskInfoQueue.getRepeatableJobs();
        const task = _.find(result, { id: jobId + '' });
        if (task) {
            nextRunTime = new Date(task.next);
        }
        return nextRunTime;
    }
    /**
     * 更新下次执行时间
     * @param jobId
     */
    async updateNextRunTime(jobId) {
        let nextRunTime = await this.getNextRunTime(jobId);
        let info = await this.taskFindOne(jobId);
        await this.taskUpdate(jobId, { ...info, nextRunTime: nextRunTime });
    }
    /**
     * 详情
     * @param id
     * @returns
     */
    async info(id) {
        const info = await this.taskFindOne(id);
        return info;
    }
    /**
     * 刷新任务状态
     */
    async updateStatus(jobId) {
        const result = await this.taskInfoQueue.getRepeatableJobs();
        const job = _.find(result, { id: jobId + '' });
        // @ts-ignore
        const task = await this.taskFindOne(job.id);
        const nextTime = await this.getNextRunTime(task.id);
        if (task) {
            if (new Date(task.nextRunTime).getTime() == nextTime.getTime()) {
                task.status = 0;
                task.nextRunTime = nextTime;
                this.taskInfoQueue.removeRepeatableByKey(job.key);
            }
            else {
                task.nextRunTime = nextTime;
            }
            await this.taskUpdate(task.id, task);
        }
    }
    /**
     * 调用service
     * @param serviceStr
     */
    async invokeService(serviceStr) {
        if (serviceStr) {
            const arr = serviceStr.split('.');
            const service = await this.app.getApplicationContext().getAsync(arr[0]);
            for (const child of arr) {
                if (child.includes('(')) {
                    const lastArr = child.split('(');
                    const param = lastArr[1].replace(')', '');
                    if (!param) {
                        return service[lastArr[0]]();
                    }
                    else {
                        return service[lastArr[0]](JSON.parse(param));
                    }
                }
            }
        }
    }
    /**
     * 删任务
     */
    async taskDel(id) {
        await this.coolCache.del(`admin:__task:${id}`);
    }
    /**
     * 查任务
     */
    async taskFindOne(id) {
        let taskInfo;
        let taskInfoStr = await this.coolCache.get(`admin:__task:${id}`);
        if (!taskInfoStr) {
            taskInfo = await this.taskInfoEntity.findOne({ id });
            taskInfo && (await this.coolCache.set(`admin:__task:${taskInfo.id}`, JSON.stringify(taskInfo)));
        }
        else {
            try {
                taskInfo = JSON.parse(taskInfoStr);
            }
            catch (e) {
                //TODO handle the exception
            }
        }
        taskInfo.repeatCount = taskInfo.limit;
        return taskInfo;
    }
    /**
     * 更新任务
     */
    async taskUpdate(id, params) {
        if (!id) {
            return Promise.resolve();
        }
        await this.coolCache.set(`admin:__task:${id}`, JSON.stringify(params));
        await this.taskInfoEntity.update(id, this.convert(params));
    }
    /**
     * 转换
     */
    convert(params) {
        return _.omit(params, ['repeatCount']);
    }
};
__decorate([
    orm_1.InjectEntityModel(info_1.TaskInfoEntity),
    __metadata("design:type", typeorm_1.Repository)
], TaskInfoService.prototype, "taskInfoEntity", void 0);
__decorate([
    decorator_1.Logger(),
    __metadata("design:type", Object)
], TaskInfoService.prototype, "logger", void 0);
__decorate([
    orm_1.InjectEntityModel(log_1.TaskLogEntity),
    __metadata("design:type", typeorm_1.Repository)
], TaskInfoService.prototype, "taskLogEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", task_1.TaskInfoQueue)
], TaskInfoService.prototype, "taskInfoQueue", void 0);
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], TaskInfoService.prototype, "app", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", utils_1.Utils)
], TaskInfoService.prototype, "utils", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], TaskInfoService.prototype, "coolCache", void 0);
TaskInfoService = __decorate([
    decorator_1.Provide()
], TaskInfoService);
exports.TaskInfoService = TaskInfoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvdGFzay9zZXJ2aWNlL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQW1FO0FBQ25FLDRDQUE0RDtBQUM1RCx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLHlDQUFnRDtBQUNoRCx1Q0FBOEM7QUFHOUMsNEJBQTRCO0FBQzVCLCtDQUE0QztBQUM1Qyx3Q0FBOEM7QUFFOUM7O0dBRUc7QUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLGtCQUFXO0lBc0I1Qzs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDVCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLEVBQUU7WUFDTixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakQsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6QztJQUNMLENB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