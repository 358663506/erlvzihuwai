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
exports.BaseSysConfService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const conf_1 = require("../../entity/sys/conf");
/**
 * 系统配置
 */
let BaseSysConfService = class BaseSysConfService extends core_1.BaseService {
    /**
     * 获得配置参数值
     * @param key
     */
    async getValue(key) {
        const conf = await this.baseSysConfEntity.findOne({ cKey: key });
        if (conf) {
            return conf.cValue;
        }
    }
    /**
     * 更新配置参数
     * @param cKey
     * @param cValue
     */
    async updateVaule(cKey, cValue) {
        await this.baseSysConfEntity.createQueryBuilder().update().where({ cKey }).set({ cKey, cValue }).execute();
    }
};
__decorate([
    orm_1.InjectEntityModel(conf_1.BaseSysConfEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysConfService.prototype, "baseSysConfEntity", void 0);
BaseSysConfService = __decorate([
    decorator_1.Provide()
], BaseSysConfService);
exports.BaseSysConfService = BaseSysConfService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy9jb25mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxnREFBMEQ7QUFFMUQ7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGtCQUFXO0lBSS9DOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRztRQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksSUFBSSxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNO1FBQzFCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvRyxDQUFDO0NBQ0osQ0FBQTtBQXJCRztJQURDLHVCQUFpQixDQUFDLHdCQUFpQixDQUFDOzhCQUNsQixvQkFBVTs2REFBb0I7QUFGeEMsa0JBQWtCO0lBRDlCLG1CQUFPLEVBQUU7R0FDRyxrQkFBa0IsQ0F1QjlCO0FBdkJZLGdEQUFrQiJ9