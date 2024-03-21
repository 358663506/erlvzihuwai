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
exports.AppletsPostController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const post_1 = require("../../entity/post");
const post_2 = require("../../service/post");
const postStatus_1 = require("../../dto/postStatus");
/* 活动发布 */
let AppletsPostController = class AppletsPostController extends core_1.BaseController {
    /**
     * 修改状态
     */
    async order(post) {
        return this.ok(await this.appletsPostService.status(post));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", post_2.AppletsPostService)
], AppletsPostController.prototype, "appletsPostService", void 0);
__decorate([
    decorator_1.Post('/status', { summary: '修改角色' }),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postStatus_1.PostStatusDTO]),
    __metadata("design:returntype", Promise)
], AppletsPostController.prototype, "order", null);
AppletsPostController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: post_1.AppletsPostEntity,
        service: post_2.AppletsPostService
    })
], AppletsPostController);
exports.AppletsPostController = AppletsPostController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FkbWluL3Bvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXVFO0FBQ3ZFLDRDQUFtRTtBQUNuRSw0Q0FBc0Q7QUFDdEQsNkNBQXdEO0FBQ3hELHFEQUFxRDtBQUVyRCxVQUFVO0FBT1YsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxxQkFBYztJQUlyRDs7T0FFRztJQUVILEtBQUssQ0FBQyxLQUFLLENBQVksSUFBbUI7UUFDdEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDSixDQUFBO0FBVEc7SUFEQyxrQkFBTSxFQUFFOzhCQUNXLHlCQUFrQjtpRUFBQztBQU12QztJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLFdBQUEsZ0JBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQTs7cUNBQU8sMEJBQWE7O2tEQUV6QztBQVZRLHFCQUFxQjtJQU5qQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx3QkFBaUI7UUFDekIsT0FBTyxFQUFFLHlCQUFrQjtLQUM5QixDQUFDO0dBQ1cscUJBQXFCLENBV2pDO0FBWFksc0RBQXFCIn0=