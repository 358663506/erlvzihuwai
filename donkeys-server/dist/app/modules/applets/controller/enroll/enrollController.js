// /* 微信用户 */
// import {Inject, Provide, Get, Post, Body, ALL} from '@midwayjs/decorator';
// import { CoolController, BaseController } from '@cool-midway/core';
// import {EnrollService} from "../../service/enrollService";
//
//
// /* 活动服务 */
// @Provide()
// @CoolController("/enroll")
// export class EnrollController extends BaseController {
//     @Inject()
//     enrollService: EnrollService;
//
//
//     /**
//      * 报名活动列表get
//      * @returns
//      */
//     @Get('/list', { summary: '报名活动列表get' })
//     public async carouselList() {
//
//         return this.ok("123455566OK");
//     }
//
//     /**
//      * 报名活动列表
//      * @returns
//      */
//     @Post('/page', { summary: '活动成员列表' })
//     public async page(@Body(ALL) query) {
//
//         return this.ok(await this.enrollService.page(query));
//     }
//
//
//     /**
//      * 添加活动
//      * @returns
//      */
//     @Post('/add', { summary: '添加活动' })
//     public async add(@Body(ALL) data: any = {}) {
//
//         return this.ok(await this.enrollService.add(data));
//     }
//
//     /**
//      * 修改
//      * @returns
//      */
//     @Post('/update', { summary: '修改' })
//     public async update(@Body(ALL) data: any = {}) {
//
//         return this.ok(await this.enrollService.update(data));
//     }
//
//     /**
//      * 活动上下线
//      */
//     @Post('/status', { summary: '活动上下线' })
//     async order(@Body() id: number) {
//
//         return this.ok(await this.enrollService.status(id));
//     }
//
//     /**
//      * 活动信息
//      * @returns
//      */
//     @Post('/info', { summary: '活动信息' })
//     public async info(@Body() id: number) {
//         return this.ok(await this.enrollService.info(id));
//     }
//
//     /**
//      * 删除
//      * @returns
//      */
//     @Post('/delete', { summary: '删除' })
//     public async delete(@Body() id: number) {
//         return this.ok(await this.enrollService.deleteById(id));
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5yb2xsQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2Vucm9sbC9lbnJvbGxDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWE7QUFDYiw2RUFBNkU7QUFDN0Usc0VBQXNFO0FBQ3RFLDZEQUE2RDtBQUM3RCxFQUFFO0FBQ0YsRUFBRTtBQUNGLGFBQWE7QUFDYixhQUFhO0FBQ2IsNkJBQTZCO0FBQzdCLHlEQUF5RDtBQUN6RCxnQkFBZ0I7QUFDaEIsb0NBQW9DO0FBQ3BDLEVBQUU7QUFDRixFQUFFO0FBQ0YsVUFBVTtBQUNWLG1CQUFtQjtBQUNuQixrQkFBa0I7QUFDbEIsVUFBVTtBQUNWLDhDQUE4QztBQUM5QyxvQ0FBb0M7QUFDcEMsRUFBRTtBQUNGLHlDQUF5QztBQUN6QyxRQUFRO0FBQ1IsRUFBRTtBQUNGLFVBQVU7QUFDVixnQkFBZ0I7QUFDaEIsa0JBQWtCO0FBQ2xCLFVBQVU7QUFDViw0Q0FBNEM7QUFDNUMsNENBQTRDO0FBQzVDLEVBQUU7QUFDRixnRUFBZ0U7QUFDaEUsUUFBUTtBQUNSLEVBQUU7QUFDRixFQUFFO0FBQ0YsVUFBVTtBQUNWLGNBQWM7QUFDZCxrQkFBa0I7QUFDbEIsVUFBVTtBQUNWLHlDQUF5QztBQUN6QyxvREFBb0Q7QUFDcEQsRUFBRTtBQUNGLDhEQUE4RDtBQUM5RCxRQUFRO0FBQ1IsRUFBRTtBQUNGLFVBQVU7QUFDVixZQUFZO0FBQ1osa0JBQWtCO0FBQ2xCLFVBQVU7QUFDViwwQ0FBMEM7QUFDMUMsdURBQXVEO0FBQ3ZELEVBQUU7QUFDRixpRUFBaUU7QUFDakUsUUFBUTtBQUNSLEVBQUU7QUFDRixVQUFVO0FBQ1YsZUFBZTtBQUNmLFVBQVU7QUFDViw2Q0FBNkM7QUFDN0Msd0NBQXdDO0FBQ3hDLEVBQUU7QUFDRiwrREFBK0Q7QUFDL0QsUUFBUTtBQUNSLEVBQUU7QUFDRixVQUFVO0FBQ1YsY0FBYztBQUNkLGtCQUFrQjtBQUNsQixVQUFVO0FBQ1YsMENBQTBDO0FBQzFDLDhDQUE4QztBQUM5Qyw2REFBNkQ7QUFDN0QsUUFBUTtBQUNSLEVBQUU7QUFDRixVQUFVO0FBQ1YsWUFBWTtBQUNaLGtCQUFrQjtBQUNsQixVQUFVO0FBQ1YsMENBQTBDO0FBQzFDLGdEQUFnRDtBQUNoRCxtRUFBbUU7QUFDbkUsUUFBUTtBQUNSLElBQUkifQ==