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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvcGFyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUE0RDtBQUM1RCx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLGtEQUE0RDtBQUU1RDs7R0FFRztBQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsa0JBQVc7SUFPaEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHO1FBQ2YsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQzthQUN0QjtTQUNKO1FBQ0QsT0FBTztJQUNYLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUc7UUFDZixJQUFJLElBQUksR0FBRyxvQ0FBb0MsQ0FBQztRQUNoRCxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNILElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUNuRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxXQUFXO1FBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7WUFDeEIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0U7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQS9DRztJQURDLHVCQUFpQixDQUFDLDBCQUFrQixDQUFDOzhCQUNsQixvQkFBVTsrREFBcUI7QUFHbkQ7SUFEQyxrQkFBTSxDQUFDLFlBQVksQ0FBQzs7c0RBQ0M7QUFMYixtQkFBbUI7SUFEL0IsbUJBQU8sRUFBRTtHQUNHLG1CQUFtQixDQWlEL0I7QUFqRFksa0RBQW1CIn0=