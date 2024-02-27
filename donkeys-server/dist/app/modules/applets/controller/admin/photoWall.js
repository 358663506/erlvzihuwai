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
exports.AppletsPhotoWallController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const photoWall_1 = require("../../entity/photoWall");
const photoWall_2 = require("../../service/photoWall");
const photoWallMove_1 = require("../../dto/photoWallMove");
/* 照片墙 */
let AppletsPhotoWallController = class AppletsPhotoWallController extends core_1.BaseController {
    /**
     * 修改分类
     */
    async move(param) {
        return this.ok(await this.appletsPhotoWallService.move(param));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", photoWall_2.AppletsPhotoWallService)
], AppletsPhotoWallController.prototype, "appletsPhotoWallService", void 0);
__decorate([
    decorator_1.Post('/move', { summary: '修改分类' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photoWallMove_1.PhotoWallMoveDTO]),
    __metadata("design:returntype", Promise)
], AppletsPhotoWallController.prototype, "move", null);
AppletsPhotoWallController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'page'],
        entity: photoWall_1.AppletsPhotoWallEntity,
        service: photoWall_2.AppletsPhotoWallService,
        pageQueryOp: {
            fieldEq: ['type', 'classifyId']
        }
    })
], AppletsPhotoWallController);
exports.AppletsPhotoWallController = AppletsPhotoWallController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FkbWluL3Bob3RvV2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBdUU7QUFDdkUsNENBQW1FO0FBQ25FLHNEQUFnRTtBQUNoRSx1REFBa0U7QUFDbEUsMkRBQTJEO0FBRTNELFNBQVM7QUFVVCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLHFCQUFjO0lBSTFEOztPQUVHO0lBRUgsS0FBSyxDQUFDLElBQUksQ0FBWSxLQUF1QjtRQUN6QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNKLENBQUE7QUFURztJQURDLGtCQUFNLEVBQUU7OEJBQ2dCLG1DQUF1QjsyRUFBQztBQU1qRDtJQURDLGdCQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsZ0JBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQTs7cUNBQVEsZ0NBQWdCOztzREFFNUM7QUFWUSwwQkFBMEI7SUFUdEMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ2hELE1BQU0sRUFBRSxrQ0FBc0I7UUFDOUIsT0FBTyxFQUFFLG1DQUF1QjtRQUNoQyxXQUFXLEVBQUU7WUFDVCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO1NBQ2xDO0tBQ0osQ0FBQztHQUNXLDBCQUEwQixDQVd0QztBQVhZLGdFQUEwQiJ9