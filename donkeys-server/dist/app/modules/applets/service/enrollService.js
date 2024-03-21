// import { Provide } from '@midwayjs/decorator';
// import {BaseService, CoolCommException} from '@cool-midway/core';
// import {EnrollEntity} from '../entity/enroll';
// import {InjectEntityModel} from "@midwayjs/orm";
// import {Brackets, Repository} from "typeorm";
// import * as R from "ramda";
// import {AppletsEnrollMusterAddressEntity} from "../entity/enroll_muster_address";
// import {AppletsMusterAddressEntity} from "../entity/muster_address";
//
// /* 报名活动 */
// @Provide()
// export class EnrollService extends BaseService {
//
//
//     @InjectEntityModel(EnrollEntity)
//     enrollEntity: Repository<EnrollEntity>;
//
//     @InjectEntityModel(AppletsEnrollMusterAddressEntity)
//     appletsEnrollMusterAddressEntity:Repository<AppletsEnrollMusterAddressEntity>
//
//     @InjectEntityModel(AppletsMusterAddressEntity)
//     appletsMusterAddressEntity:Repository<AppletsMusterAddressEntity>
//     /**
//      * 分页查询
//      * @param query
//      */
//     async page(query) {
//         const { size = 15, page = 1, sort = null, name, status } = query;
//         // 后台 admin 默认查全部
//
//         let result = await this.enrollEntity
//             .createQueryBuilder('a')
//             .where('1 = 1')
//             .andWhere(
//                 new Brackets((qb) => {
//                     if (!R.isNil(status)) {
//                         if (status != -1) {
//                             // 小程序用户传 -1 可以查询全部
//                             qb.where('a.status = :status', { status: status });
//                         }
//                     }
//                 })
//             )
//             .andWhere(
//                 new Brackets((qb) => {
//                     if (name) {
//                         qb.where('a.name LIKE :name', { name: `%${name}%` });
//                     }
//                 })
//             )
//             .skip((page - 1) * size) // 跳过个数
//             .take(size) //查询个数
//             .orderBy(sort ? { 'a.createTime': sort } : { 'a.top': 'DESC', 'a.status': 'ASC', 'a.createTime': 'DESC' })
//             .getManyAndCount();
//         return {
//             list: result[0],
//             pagination: {
//                 page: page,
//                 size: size,
//                 total: result[1] || 0
//             }
//         };
//     }
//     /**
//      * 新增
//      * @param param
//      */
//     async add(param) {
//
//
//         const savedParam  = await this.enrollEntity.save(param);
//
//         if(param.addressList){
//
//             // 使用forEach方法遍历数组
//             for (const addressId of param.addressList) {
//                 console.log("====================>"+addressId)
//                 const  addressInfo = await this.appletsMusterAddressEntity.findOne({ id: addressId });
//
//                 console.log("=========addressInfo===========>"+addressInfo);
//                 if(addressInfo){
//
//                     const  enrollMusterAddressEntity = new AppletsEnrollMusterAddressEntity();
//                     enrollMusterAddressEntity.enroll_id= savedParam.id;
//                     enrollMusterAddressEntity.muster_address_id = addressId;
//                     enrollMusterAddressEntity.muster_time=addressInfo.muster_time;
//                     enrollMusterAddressEntity.name = addressInfo.name;
//
//                     console.log("====================>"+savedParam.id);
//                     console.log("====================>"+addressInfo.muster_time);
//                     await this.appletsEnrollMusterAddressEntity.save(enrollMusterAddressEntity);
//                 }
//
//             }
//         }
//
//         return param;
//     }
//
//     /**
//      * 修改
//      * @param param 数据
//      */
//     async update(param) {
//         let postInfo = await this.enrollEntity.findOne({ id: param.id });
//         if (!postInfo) {
//             throw new CoolCommException('活动不存在');
//         }
//
//         await this.enrollEntity.save(param);
//
//         return param;
//     }
//
//     async deleteById(id: number) {
//         let postInfo = await this.enrollEntity.findOne({ id: id });
//         if (postInfo) {
//             await this.enrollEntity.delete({ id });
//         }
//         return '';
//     }
//
//     /**
//      * 根据ID获得信息
//      * @param id
//      */
//     public async info(id) {
//         if (!id) {
//             throw new CoolCommException('非法操作~');
//         }
//         let postInfo = await this.enrollEntity.findOne({ id: id });
//         if (!postInfo) {
//             throw new CoolCommException('活动不存在');
//         }
//         return postInfo;
//     }
//
//     /**
//      * 修改状态
//      * @param post
//      */
//     public async status(id: number) {
//         const postInfo = await this.enrollEntity.findOne({ id: id });
//         if (!postInfo) {
//             throw new CoolCommException('数据不存在');
//         }
//         if(postInfo.status==1){
//             postInfo.status=0;
//         }else{
//             postInfo.status=1;
//         }
//
//         await this.enrollEntity.save(postInfo);
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9zZXJ2aWNlL2Vucm9sbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaURBQWlEO0FBQ2pELG9FQUFvRTtBQUNwRSxpREFBaUQ7QUFDakQsbURBQW1EO0FBQ25ELGdEQUFnRDtBQUNoRCw4QkFBOEI7QUFDOUIsb0ZBQW9GO0FBQ3BGLHVFQUF1RTtBQUN2RSxFQUFFO0FBQ0YsYUFBYTtBQUNiLGFBQWE7QUFDYixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLEVBQUU7QUFDRix1Q0FBdUM7QUFDdkMsOENBQThDO0FBQzlDLEVBQUU7QUFDRiwyREFBMkQ7QUFDM0Qsb0ZBQW9GO0FBQ3BGLEVBQUU7QUFDRixxREFBcUQ7QUFDckQsd0VBQXdFO0FBQ3hFLFVBQVU7QUFDVixjQUFjO0FBQ2Qsc0JBQXNCO0FBQ3RCLFVBQVU7QUFDViwwQkFBMEI7QUFDMUIsNEVBQTRFO0FBQzVFLDRCQUE0QjtBQUM1QixFQUFFO0FBQ0YsK0NBQStDO0FBQy9DLHVDQUF1QztBQUN2Qyw4QkFBOEI7QUFDOUIseUJBQXlCO0FBQ3pCLHlDQUF5QztBQUN6Qyw4Q0FBOEM7QUFDOUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxrRkFBa0Y7QUFDbEYsNEJBQTRCO0FBQzVCLHdCQUF3QjtBQUN4QixxQkFBcUI7QUFDckIsZ0JBQWdCO0FBQ2hCLHlCQUF5QjtBQUN6Qix5Q0FBeUM7QUFDekMsa0NBQWtDO0FBQ2xDLGdGQUFnRjtBQUNoRix3QkFBd0I7QUFDeEIscUJBQXFCO0FBQ3JCLGdCQUFnQjtBQUNoQiwrQ0FBK0M7QUFDL0MsaUNBQWlDO0FBQ2pDLHlIQUF5SDtBQUN6SCxrQ0FBa0M7QUFDbEMsbUJBQW1CO0FBQ25CLCtCQUErQjtBQUMvQiw0QkFBNEI7QUFDNUIsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5Qix3Q0FBd0M7QUFDeEMsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYixRQUFRO0FBQ1IsVUFBVTtBQUNWLFlBQVk7QUFDWixzQkFBc0I7QUFDdEIsVUFBVTtBQUNWLHlCQUF5QjtBQUN6QixFQUFFO0FBQ0YsRUFBRTtBQUNGLG1FQUFtRTtBQUNuRSxFQUFFO0FBQ0YsaUNBQWlDO0FBQ2pDLEVBQUU7QUFDRixpQ0FBaUM7QUFDakMsMkRBQTJEO0FBQzNELGlFQUFpRTtBQUNqRSx5R0FBeUc7QUFDekcsRUFBRTtBQUNGLCtFQUErRTtBQUMvRSxtQ0FBbUM7QUFDbkMsRUFBRTtBQUNGLGlHQUFpRztBQUNqRywwRUFBMEU7QUFDMUUsK0VBQStFO0FBQy9FLHFGQUFxRjtBQUNyRix5RUFBeUU7QUFDekUsRUFBRTtBQUNGLDBFQUEwRTtBQUMxRSxvRkFBb0Y7QUFDcEYsbUdBQW1HO0FBQ25HLG9CQUFvQjtBQUNwQixFQUFFO0FBQ0YsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixFQUFFO0FBQ0Ysd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUixFQUFFO0FBQ0YsVUFBVTtBQUNWLFlBQVk7QUFDWix5QkFBeUI7QUFDekIsVUFBVTtBQUNWLDRCQUE0QjtBQUM1Qiw0RUFBNEU7QUFDNUUsMkJBQTJCO0FBQzNCLG9EQUFvRDtBQUNwRCxZQUFZO0FBQ1osRUFBRTtBQUNGLCtDQUErQztBQUMvQyxFQUFFO0FBQ0Ysd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUixFQUFFO0FBQ0YscUNBQXFDO0FBQ3JDLHNFQUFzRTtBQUN0RSwwQkFBMEI7QUFDMUIsc0RBQXNEO0FBQ3RELFlBQVk7QUFDWixxQkFBcUI7QUFDckIsUUFBUTtBQUNSLEVBQUU7QUFDRixVQUFVO0FBQ1Ysa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixVQUFVO0FBQ1YsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQixvREFBb0Q7QUFDcEQsWUFBWTtBQUNaLHNFQUFzRTtBQUN0RSwyQkFBMkI7QUFDM0Isb0RBQW9EO0FBQ3BELFlBQVk7QUFDWiwyQkFBMkI7QUFDM0IsUUFBUTtBQUNSLEVBQUU7QUFDRixVQUFVO0FBQ1YsY0FBYztBQUNkLHFCQUFxQjtBQUNyQixVQUFVO0FBQ1Ysd0NBQXdDO0FBQ3hDLHdFQUF3RTtBQUN4RSwyQkFBMkI7QUFDM0Isb0RBQW9EO0FBQ3BELFlBQVk7QUFDWixrQ0FBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLGlCQUFpQjtBQUNqQixpQ0FBaUM7QUFDakMsWUFBWTtBQUNaLEVBQUU7QUFDRixrREFBa0Q7QUFDbEQsUUFBUTtBQUNSLElBQUkifQ==