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
exports.BaseSysParamService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const param_1 = require("../../entity/sys/param");
/**
 * 参数配置
 */
let BaseSysParamService = class BaseSysParamService extends core_1.BaseService {
    /**
     * 根据key获得对应的参数
     * @param key
     */
    async dataByKey(key) {
        let result = await this.coolCache.get(`param:${key}`);
        if (result) {
            result = JSON.parse(result);
            if (result.dataType !== 0) {
                return JSON.parse(result.data);
            }
            else {
                return result.data;
            }
        }
        return;
    }
    /**
     * 根据key获得对应的网页数据
     * @param key
     */
    async htmlByKey(key) {
        let html = '<html><body>@content</body></html>';
        let result = await this.coolCache.get(`param:${key}`);
        if (result) {
            result = JSON.parse(result);
            html = html.replace('@content', result.data);
        }
        else {
            html = html.replace('@content', 'key notfound');
        }
        return html;
    }
    /**
     * 重新初始化缓存
     */
    async modifyAfter() {
        const params = await this.baseSysParamEntity.find();
        for (const param of params) {
            await this.coolCache.set(`param:${param.keyName}`, JSON.stringify(param));
        }
    }
};
__decorate([
    orm_1.InjectEntityModel(param_1.BaseSysParamEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysParamService.prototype, "baseSysParamEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], BaseSysParamService.prototype, "coolCache", void 0);
BaseSysParamService = __decorate([
    decorator_1.Provide()
], BaseSysParamService);
exports.BaseSysParamService = BaseSysParamService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL3BhcmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBNEQ7QUFDNUQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBNEQ7QUFFNUQ7O0dBRUc7QUFFSCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLGtCQUFXO0lBT2hEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRztRQUNmLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDSCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDdEI7U0FDSjtRQUNELE9BQU87SUFDWCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHO1FBQ2YsSUFBSSxJQUFJLEdBQUcsb0NBQW9DLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hEO2FBQU07WUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsV0FBVztRQUNiLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdFO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUEvQ0c7SUFEQyx1QkFBaUIsQ0FBQywwQkFBa0IsQ0FBQzs4QkFDbEIsb0JBQVU7K0RBQXFCO0FBR25EO0lBREMsa0JBQU0sQ0FBQyxZQUFZLENBQUM7O3NEQUNDO0FBTGIsbUJBQW1CO0lBRC9CLG1CQUFPLEVBQUU7R0FDRyxtQkFBbUIsQ0FpRC9CO0FBakRZLGtEQUFtQiJ9