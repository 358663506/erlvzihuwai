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
exports.AppletsPhotoWallTypeController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const photoWallType_1 = require("../../entity/photoWallType");
const photoWallType_2 = require("../../service/photoWallType");
/* 照片墙分类 */
let AppletsPhotoWallTypeController = class AppletsPhotoWallTypeController extends core_1.BaseController {
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", photoWallType_2.AppletsPhotoWallTypeService)
], AppletsPhotoWallTypeController.prototype, "appletsPhotoWallTypeService", void 0);
AppletsPhotoWallTypeController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: photoWallType_1.AppletsPhotoWallTypeEntity,
        service: photoWallType_2.AppletsPhotoWallTypeService
    })
], AppletsPhotoWallTypeController);
exports.AppletsPhotoWallTypeController = AppletsPhotoWallTypeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FkbWluL3Bob3RvV2FsbFR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSw4REFBd0U7QUFDeEUsK0RBQTBFO0FBRTFFLFdBQVc7QUFPWCxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUErQixTQUFRLHFCQUFjO0NBR2pFLENBQUE7QUFERztJQURDLGtCQUFNLEVBQUU7OEJBQ29CLDJDQUEyQjttRkFBQztBQUZoRCw4QkFBOEI7SUFOMUMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUsMENBQTBCO1FBQ2xDLE9BQU8sRUFBRSwyQ0FBMkI7S0FDdkMsQ0FBQztHQUNXLDhCQUE4QixDQUcxQztBQUhZLHdFQUE4QiJ9