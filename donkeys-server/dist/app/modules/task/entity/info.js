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
exports.TaskInfoEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 任务信息
 */
let TaskInfoEntity = class TaskInfoEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '任务ID', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "jobId", void 0);
__decorate([
    typeorm_1.Column({ comment: '任务配置', nullable: true, length: 1000 }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "repeatConf", void 0);
__decorate([
    typeorm_1.Column({ comment: '名称' }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: 'cron', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "cron", void 0);
__decorate([
    typeorm_1.Column({ comment: '最大执行次数 不传为无限次', nullable: true }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "limit", void 0);
__decorate([
    typeorm_1.Column({
        comment: '每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效',
        nullable: true
    }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "every", void 0);
__decorate([
    typeorm_1.Column({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "remark", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:停止 1：运行', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ comment: '开始时间', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column({ comment: '结束时间', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "endDate", void 0);
__decorate([
    typeorm_1.Column({ comment: '数据', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "data", void 0);
__decorate([
    typeorm_1.Column({ comment: '执行的service实例ID', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "service", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:系统 1：用户', default: 0, type: 'tinyint' }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ comment: '下一次执行时间', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "nextRunTime", void 0);
__decorate([
    typeorm_1.Column({ comment: '状态 0:cron 1：时间间隔', default: 0, type: 'tinyint' }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "taskType", void 0);
TaskInfoEntity = __decorate([
    orm_1.EntityModel('task_info')
], TaskInfoEntity);
exports.TaskInfoEntity = TaskInfoEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvdGFzay9lbnRpdHkvaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUFpQztBQUVqQzs7R0FFRztBQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxpQkFBVTtDQWdEN0MsQ0FBQTtBQTlDRztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NkNBQzlCO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQ3ZDO0FBR25CO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQ2I7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQy9CO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzZDQUN2QztBQU1kO0lBSkMsZ0JBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSwrQkFBK0I7UUFDeEMsUUFBUSxFQUFFLElBQUk7S0FDakIsQ0FBQzs7NkNBQ1k7QUFHZDtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OENBQzNCO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7OENBQ2xEO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ2pDLElBQUk7aURBQUM7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ25DLElBQUk7K0NBQUM7QUFHZDtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQzdCO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ3RDO0FBR2hCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OzRDQUNwRDtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUNsQyxJQUFJO21EQUFDO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7Z0RBQ3BEO0FBL0NSLGNBQWM7SUFEMUIsaUJBQVcsQ0FBQyxXQUFXLENBQUM7R0FDWixjQUFjLENBZ0QxQjtBQWhEWSx3Q0FBYyJ9