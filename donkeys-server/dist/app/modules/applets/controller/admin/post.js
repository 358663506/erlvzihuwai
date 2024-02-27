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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9hZG1pbi9wb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUF1RTtBQUN2RSw0Q0FBbUU7QUFDbkUsNENBQXNEO0FBQ3RELDZDQUF3RDtBQUN4RCxxREFBcUQ7QUFFckQsVUFBVTtBQU9WLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFJckQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFZLElBQW1CO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0osQ0FBQTtBQVRHO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7aUVBQUM7QUFNdkM7SUFEQyxnQkFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN4QixXQUFBLGdCQUFJLENBQUMsZUFBRyxDQUFDLENBQUE7O3FDQUFPLDBCQUFhOztrREFFekM7QUFWUSxxQkFBcUI7SUFOakMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUsd0JBQWlCO1FBQ3pCLE9BQU8sRUFBRSx5QkFBa0I7S0FDOUIsQ0FBQztHQUNXLHFCQUFxQixDQVdqQztBQVhZLHNEQUFxQiJ9