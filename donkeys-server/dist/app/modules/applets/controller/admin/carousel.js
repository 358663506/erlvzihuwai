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
exports.AppletsCarouselController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const carousel_1 = require("../../entity/carousel");
const carousel_2 = require("../../service/carousel");
/* 轮播图 */
let AppletsCarouselController = class AppletsCarouselController extends core_1.BaseController {
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", carousel_2.AppletsCarouselService)
], AppletsCarouselController.prototype, "appletsCarouselService", void 0);
AppletsCarouselController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: carousel_1.AppletsCarouselEntity,
        service: carousel_2.AppletsCarouselService
    })
], AppletsCarouselController);
exports.AppletsCarouselController = AppletsCarouselController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2NvbnRyb2xsZXIvYWRtaW4vY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSxvREFBOEQ7QUFDOUQscURBQWdFO0FBRWhFLFNBQVM7QUFPVCxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLHFCQUFjO0NBRzVELENBQUE7QUFERztJQURDLGtCQUFNLEVBQUU7OEJBQ2UsaUNBQXNCO3lFQUFDO0FBRnRDLHlCQUF5QjtJQU5yQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxnQ0FBcUI7UUFDN0IsT0FBTyxFQUFFLGlDQUFzQjtLQUNsQyxDQUFDO0dBQ1cseUJBQXlCLENBR3JDO0FBSFksOERBQXlCIn0=