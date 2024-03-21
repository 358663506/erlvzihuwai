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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSysLogController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const log_1 = require("../../../entity/sys/log");
const user_1 = require("../../../entity/sys/user");
const conf_1 = require("../../../service/sys/conf");
const log_2 = require("../../../service/sys/log");
/**
 * 系统日志
 */
let BaseSysLogController = class BaseSysLogController extends core_1.BaseController {
    /**
     * 清空日志
     */
    async clear() {
        await this.baseSysLogService.clear(true);
        return this.ok();
    }
    /**
     * 设置日志保存时间
     */
    async setKeep(value) {
        await this.baseSysConfService.updateVaule('logKeep', value);
        return this.ok();
    }
    /**
     * 获得日志保存时间
     */
    async getKeep() {
        return this.ok(await this.baseSysConfService.getValue('logKeep'));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", log_2.BaseSysLogService)
], BaseSysLogController.prototype, "baseSysLogService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", conf_1.BaseSysConfService)
], BaseSysLogController.prototype, "baseSysConfService", void 0);
__decorate([
    decorator_1.Post('/clear', { summary: '清理' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "clear", null);
__decorate([
    decorator_1.Post('/setKeep', { summary: '日志保存时间' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "setKeep", null);
__decorate([
    decorator_1.Get('/getKeep', { summary: '获得日志保存时间' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "getKeep", null);
BaseSysLogController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['page'],
        entity: log_1.BaseSysLogEntity,
        urlTag: {
            name: 'a',
            url: ['add']
        },
        pageQueryOp: {
            keyWordLikeFields: ['b.name', 'a.params', 'a.ipAddr'],
            select: ['a.*', 'b.name'],
            leftJoin: [
                {
                    entity: user_1.BaseSysUserEntity,
                    alias: 'b',
                    condition: 'a.userId = b.id'
                }
            ]
        }
    })
], BaseSysLogController);
exports.BaseSysLogController = BaseSysLogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9iYXNlL2NvbnRyb2xsZXIvYWRtaW4vc3lzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBdUU7QUFDdkUsNENBQW1FO0FBQ25FLGlEQUEyRDtBQUMzRCxtREFBNkQ7QUFDN0Qsb0RBQStEO0FBQy9ELGtEQUE2RDtBQUU3RDs7R0FFRztBQXFCSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLHFCQUFjO0lBT3BEOztPQUVHO0lBRUksS0FBSyxDQUFDLEtBQUs7UUFDZCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBRUksS0FBSyxDQUFDLE9BQU8sQ0FBUyxLQUFhO1FBQ3RDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBRUksS0FBSyxDQUFDLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDSixDQUFBO0FBOUJHO0lBREMsa0JBQU0sRUFBRTs4QkFDVSx1QkFBaUI7K0RBQUM7QUFHckM7SUFEQyxrQkFBTSxFQUFFOzhCQUNXLHlCQUFrQjtnRUFBQztBQU12QztJQURDLGdCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs7O2lEQUlqQztBQU1EO0lBREMsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDbEIsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7bURBRzNCO0FBTUQ7SUFEQyxlQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDOzs7O21EQUd4QztBQS9CUSxvQkFBb0I7SUFwQmhDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ1osR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2IsTUFBTSxFQUFFLHNCQUFnQjtRQUN4QixNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsR0FBRztZQUNULEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNmO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUNyRCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO1lBQ3pCLFFBQVEsRUFBRTtnQkFDTjtvQkFDSSxNQUFNLEVBQUUsd0JBQWlCO29CQUN6QixLQUFLLEVBQUUsR0FBRztvQkFDVixTQUFTLEVBQUUsaUJBQWlCO2lCQUMvQjthQUNKO1NBQ0o7S0FDSixDQUFDO0dBQ1csb0JBQW9CLENBZ0NoQztBQWhDWSxvREFBb0IifQ==