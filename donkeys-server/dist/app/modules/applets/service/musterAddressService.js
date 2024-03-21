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
            .orderBy(sort ? { 'a.createTime': sort } : { 'a.status': 'ASC', 'a.createTime': 'DESC' })
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