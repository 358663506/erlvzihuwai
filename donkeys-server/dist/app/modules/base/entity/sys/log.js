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
exports.BaseSysLogEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 系统日志
 */
let BaseSysLogEntity = class BaseSysLogEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '用户ID', nullable: true, type: 'bigint' }),
    __metadata("design:type", Number)
], BaseSysLogEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '行为', length: 100 }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "action", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: 'ip', nullable: true, length: 50 }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "ip", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: 'ip地址', nullable: true, length: 50 }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "ipAddr", void 0);
__decorate([
    typeorm_1.Column({ comment: '参数', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "params", void 0);
BaseSysLogEntity = __decorate([
    orm_1.EntityModel('base_sys_log')
], BaseSysLogEntity);
exports.BaseSysLogEntity = BaseSysLogEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9iYXNlL2VudGl0eS9zeXMvbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQXdDO0FBRXhDOztHQUVHO0FBRUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxpQkFBVTtDQW1CL0MsQ0FBQTtBQWhCRztJQUZDLGVBQUssRUFBRTtJQUNQLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDOztnREFDN0M7QUFJZjtJQUZDLGVBQUssRUFBRTtJQUNQLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzs7Z0RBQ3hCO0FBSWY7SUFGQyxlQUFLLEVBQUU7SUFDUCxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7NENBQzNDO0FBSVg7SUFGQyxlQUFLLEVBQUU7SUFDUCxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7Z0RBQ3pDO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7Z0RBQ3pDO0FBbEJOLGdCQUFnQjtJQUQ1QixpQkFBVyxDQUFDLGNBQWMsQ0FBQztHQUNmLGdCQUFnQixDQW1CNUI7QUFuQlksNENBQWdCIn0=