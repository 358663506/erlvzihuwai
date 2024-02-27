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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9XYWxsVHlwZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvY29udHJvbGxlci9hZG1pbi9waG90b1dhbGxUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsOERBQXdFO0FBQ3hFLCtEQUEwRTtBQUUxRSxXQUFXO0FBT1gsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBK0IsU0FBUSxxQkFBYztDQUdqRSxDQUFBO0FBREc7SUFEQyxrQkFBTSxFQUFFOzhCQUNvQiwyQ0FBMkI7bUZBQUM7QUFGaEQsOEJBQThCO0lBTjFDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ1osR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLDBDQUEwQjtRQUNsQyxPQUFPLEVBQUUsMkNBQTJCO0tBQ3ZDLENBQUM7R0FDVyw4QkFBOEIsQ0FHMUM7QUFIWSx3RUFBOEIifQ==