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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsLmpzIiwic291cmNlUm9vdCI6IkU6L25ld0VMdi9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2NvbnRyb2xsZXIvYWRtaW4vcGhvdG9XYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUF1RTtBQUN2RSw0Q0FBbUU7QUFDbkUsc0RBQWdFO0FBQ2hFLHVEQUFrRTtBQUNsRSwyREFBMkQ7QUFFM0QsU0FBUztBQVVULElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEscUJBQWM7SUFJMUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFZLEtBQXVCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQ0osQ0FBQTtBQVRHO0lBREMsa0JBQU0sRUFBRTs4QkFDZ0IsbUNBQXVCOzJFQUFDO0FBTWpEO0lBREMsZ0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdkIsV0FBQSxnQkFBSSxDQUFDLGVBQUcsQ0FBQyxDQUFBOztxQ0FBUSxnQ0FBZ0I7O3NEQUU1QztBQVZRLDBCQUEwQjtJQVR0QyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDaEQsTUFBTSxFQUFFLGtDQUFzQjtRQUM5QixPQUFPLEVBQUUsbUNBQXVCO1FBQ2hDLFdBQVcsRUFBRTtZQUNULE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7U0FDbEM7S0FDSixDQUFDO0dBQ1csMEJBQTBCLENBV3RDO0FBWFksZ0VBQTBCIn0=