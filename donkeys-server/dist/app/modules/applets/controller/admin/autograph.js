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
exports.AppletsAutographController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const autograph_1 = require("../../entity/autograph");
const autograph_2 = require("../../service/autograph");
/* 活动发布 */
let AppletsAutographController = class AppletsAutographController extends core_1.BaseController {
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", autograph_2.AppletsAutographService)
], AppletsAutographController.prototype, "appletsAutographService", void 0);
AppletsAutographController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: autograph_1.AppletsAutographEntity,
        service: autograph_2.AppletsAutographService
    })
], AppletsAutographController);
exports.AppletsAutographController = AppletsAutographController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2dyYXBoLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYXBwbGV0cy9jb250cm9sbGVyL2FkbWluL2F1dG9ncmFwaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLHNEQUFnRTtBQUNoRSx1REFBa0U7QUFFbEUsVUFBVTtBQU9WLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEscUJBQWM7Q0FHN0QsQ0FBQTtBQURHO0lBREMsa0JBQU0sRUFBRTs4QkFDZ0IsbUNBQXVCOzJFQUFDO0FBRnhDLDBCQUEwQjtJQU50QyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxrQ0FBc0I7UUFDOUIsT0FBTyxFQUFFLG1DQUF1QjtLQUNuQyxDQUFDO0dBQ1csMEJBQTBCLENBR3RDO0FBSFksZ0VBQTBCIn0=