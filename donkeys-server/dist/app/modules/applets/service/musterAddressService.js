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
exports.MusterAddressService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const R = require("ramda");
const muster_address_1 = require("../entity/muster_address");
/* 报名活动 */
let MusterAddressService = class MusterAddressService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { size = 15, page = 1, sort = null, name, status } = query;
        let result = await this.appletsMusterAddressEntity
            .createQueryBuilder('a')
            .where('1 = 1')
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (!R.isNil(status)) {
                if (status != -1) {
                    // 小程序用户传 -1 可以查询全部
                    qb.where('a.status = :status', { status: status });
                }
            }
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (name) {
                qb.where('a.name LIKE :name', { name: `%${name}%` });
            }
        }))
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy(sort ? { 'a.createTime': sort } : { 'a.top': 'DESC', 'a.status': 'ASC', 'a.createTime': 'DESC' })
            .getManyAndCount();
        return {
            list: result[0],
            pagination: {
                page: page,
                size: size,
                total: result[1] || 0
            }
        };
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        await this.appletsMusterAddressEntity.save(param);
        return param;
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        let postInfo = await this.appletsMusterAddressEntity.findOne({ id: param.id });
        if (!postInfo) {
            throw new core_1.CoolCommException('活动不存在');
        }
        await this.appletsMusterAddressEntity.save(param);
        return param;
    }
    async deleteById(id) {
        let postInfo = await this.appletsMusterAddressEntity.findOne({ id: id });
        if (postInfo) {
            await this.appletsMusterAddressEntity.delete({ id });
        }
        return '';
    }
    /**
     * 根据ID获得信息
     * @param id
     */
    async info(id) {
        if (!id) {
            throw new core_1.CoolCommException('非法操作~');
        }
        let postInfo = await this.appletsMusterAddressEntity.findOne({ id: id });
        if (!postInfo) {
            throw new core_1.CoolCommException('活动不存在');
        }
        return postInfo;
    }
    /**
     * 修改状态
     * @param post
     */
    async status(id) {
        const postInfo = await this.appletsMusterAddressEntity.findOne({ id: id });
        if (!postInfo) {
            throw new core_1.CoolCommException('数据不存在');
        }
        if (postInfo.status == 1) {
            postInfo.status = 0;
        }
        else {
            postInfo.status = 1;
        }
        await this.appletsMusterAddressEntity.save(postInfo);
    }
};
__decorate([
    orm_1.InjectEntityModel(muster_address_1.AppletsMusterAddressEntity),
    __metadata("design:type", typeorm_1.Repository)
], MusterAddressService.prototype, "appletsMusterAddressEntity", void 0);
MusterAddressService = __decorate([
    decorator_1.Provide()
], MusterAddressService);
exports.MusterAddressService = MusterAddressService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzdGVyQWRkcmVzc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9tdXN0ZXJBZGRyZXNzU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQWlFO0FBQ2pFLHVDQUFnRDtBQUNoRCxxQ0FBNkM7QUFDN0MsMkJBQTJCO0FBQzNCLDZEQUFvRTtBQUVwRSxVQUFVO0FBRVYsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxrQkFBVztJQU1qRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDWixNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUVqRSxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQywwQkFBMEI7YUFDN0Msa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDZCxRQUFRLENBQ0wsSUFBSSxrQkFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNkLG1CQUFtQjtvQkFDbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RDthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQ0w7YUFDQSxRQUFRLENBQ0wsSUFBSSxrQkFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFD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