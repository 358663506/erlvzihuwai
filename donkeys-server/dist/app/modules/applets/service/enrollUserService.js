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
exports.EnrollUserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const enrollUser_1 = require("../entity/enrollUser");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const R = require("ramda");
/* 报名活动 */
let EnrollUserService = class EnrollUserService extends core_1.BaseService {
    /**
     * 根据活动查询成员
     * @param param
     */
    async page(query) {
        const { size = 15, page = 1, sort } = query;
        // 查询用户
        let result = await this.enrollUserEntity
            .createQueryBuilder('a')
            .where('1 = 1')
            .andWhere('a.enroll_id = :enroll_id', { enroll_id: query.enroll_id })
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (!R.isNil(query.status)) {
                if (query.status != -1) {
                    // 小程序用户传 -1 可以查询全部
                    qb.where('a.status = :status', { status: query.status });
                }
            }
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            if (query.name) {
                qb.where('a.name LIKE :name', { name: `%${query.name}%` });
            }
        }))
            .skip((page - 1) * size) // 跳过个数
            .take(size) //查询个数
            .orderBy({ 'a.createTime': sort || 'DESC' })
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
        // 判断是否可以新增
        await this.enrollUserEntity.save(param);
        return param;
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        // 判断是否可以修改
        let postInfo = await this.enrollUserEntity.findOne({ id: param.id });
        if (!postInfo) {
            throw new core_1.CoolCommException('活动用户不存在');
        }
        await this.enrollUserEntity.save(param);
        return param;
    }
    async deleteById(id) {
        let postInfo = await this.enrollUserEntity.findOne({ id: id });
        if (postInfo) {
            await this.enrollUserEntity.delete({ id });
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
        let postInfo = await this.enrollUserEntity.findOne({ id: id });
        if (!postInfo) {
            throw new core_1.CoolCommException('活动用户不存在');
        }
        return postInfo;
    }
    /**
     * 修改状态
     * @param post
     */
    async status(id) {
        const postInfo = await this.enrollUserEntity.findOne({ id: id });
        if (!postInfo) {
            throw new core_1.CoolCommException('数据不存在');
        }
        if (postInfo.status == 1) {
            postInfo.status = 0;
        }
        else {
            postInfo.status = 1;
        }
        await this.enrollUserEntity.save(postInfo);
    }
    /**
     * 根据活动获取成员信息
     * @param enrollId
     * @param openId
     */
    // public async getByEnrollId(openId:string,enrollId: number){
    //
    //     let userInfo = await this.enrollUserEntity
    //         .createQueryBuilder('c')
    //         .where('c.openid = :openId', { openId:openId})
    //         .andWhere('c.enroll_id = :enrollId',{enrollId: enrollId})
    //         //.where('c.openid = :openId and c.enroll_id = :enrollId', { openId: openId, enrollId: enrollId })
    //         //.loadRelationCountAndMap('c.collectCount', 'c.collects')
    //         .limit(1) // 添加 LIMIT 1
    //         .getOne();
    //
    //     return userInfo;
    // }
    async getByEnrollId(openId, enrollId) {
        let userInfo = await this.enrollUserEntity
            .createQueryBuilder('c')
            .where('c.openid = :openId and c.enroll_id = :enrollId', { openId, enrollId })
            .limit(1) // 添加 LIMIT 1
            .getOne();
        return userInfo;
    }
    /**
     * 获取已填的身份证信息
     * @param enrollId
     * @param openId
     */
    async getIdCardByOpenId(openId) {
        let userInfo = await this.enrollUserEntity
            .createQueryBuilder('c')
            .where('c.openid = :openId and c.id_card is not null', { openId: openId })
            //.loadRelationCountAndMap('c.collectCount', 'c.collects')
            .limit(1) // 添加 LIMIT 1
            .getOne();
        return userInfo;
    }
};
__decorate([
    orm_1.InjectEntityModel(enrollUser_1.EnrollUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], EnrollUserService.prototype, "enrollUserEntity", void 0);
EnrollUserService = __decorate([
    decorator_1.Provide()
], EnrollUserService);
exports.EnrollUserService = EnrollUserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsVXNlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvc2VydmljZS9lbnJvbGxVc2VyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQWlFO0FBQ2pFLHFEQUF3RDtBQUN4RCx1Q0FBZ0Q7QUFFaEQscUNBQTZDO0FBQzdDLDJCQUEyQjtBQUkzQixVQUFVO0FBRVYsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxrQkFBVztJQVE5Qzs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDWixNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztRQUM1QyxPQUFPO1FBQ1AsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCO2FBQ25DLGtCQUFrQixDQUFDLEdBQUcsQ0FBQzthQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ2QsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwRSxRQUFRLENBQ0wsSUFBSSxrQkFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN4QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3BCLG1CQUFtQjtvQkFDbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDNUQ7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUNMO2FBQ0EsUUFBUSxDQUNMLElBQUksa0JBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2hCLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDWixFQUFFLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQzthQUM5RDtRQUNMLENBQUMsQ0FBQyxDQUNMO2FBQ0EsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU87YUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07YUFDakIsT0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQzthQUMzQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPO1lBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3hCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFDRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUs7UUFDWCxXQUFXO1FBRVgsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFJRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFDZCxXQUFXO1FBRVgsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksd0JBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUM7UUFFRCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBVTtRQUN2QixJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLFFBQVEsRUFBRTtZQUNWLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDaEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNMLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksd0JBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLElBQUksd0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUUsQ0FBQyxFQUFDO1lBQ2xCLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1NBQ3JCO2FBQUk7WUFDRCxRQUFRLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztTQUNyQjtRQUNELE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDhEQUE4RDtJQUM5RCxFQUFFO0lBQ0YsaURBQWlEO0lBQ2pELG1DQUFtQztJQUNuQyx5REFBeUQ7SUFDekQsb0VBQW9FO0lBQ3BFLDZHQUE2RztJQUM3RyxxRUFBcUU7SUFDckUsa0NBQWtDO0lBQ2xDLHFCQUFxQjtJQUNyQixFQUFFO0lBQ0YsdUJBQXVCO0lBQ3ZCLElBQUk7SUFHRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUV2RCxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0I7YUFDckMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxnREFBZ0QsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQzthQUM1RSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTthQUN0QixNQUFNLEVBQUUsQ0FBQztRQUVkLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFHRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQWE7UUFFeEMsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCO2FBQ3JDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQzthQUN2QixLQUFLLENBQUMsOENBQThDLEVBQUUsRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLENBQUM7WUFDekUsMERBQTBEO2FBQ3pELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO2FBQ3RCLE1BQU0sRUFBRSxDQUFDO1FBRWQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztDQUVKLENBQUE7QUFyS0c7SUFEQyx1QkFBaUIsQ0FBQyw2QkFBZ0IsQ0FBQzs4QkFDbEIsb0JBQVU7MkRBQW1CO0FBSHRDLGlCQUFpQjtJQUQ3QixtQkFBTyxFQUFFO0dBQ0csaUJBQWlCLENBd0s3QjtBQXhLWSw4Q0FBaUIifQ==