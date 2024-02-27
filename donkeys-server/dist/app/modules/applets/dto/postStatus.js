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
exports.PostTopDTO = exports.PostStatusDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 修改权限参数校验
 */
class PostStatusDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], PostStatusDTO.prototype, "id", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required(), {
        required: true,
        min: 0,
        max: 99
    }),
    __metadata("design:type", Number)
], PostStatusDTO.prototype, "status", void 0);
exports.PostStatusDTO = PostStatusDTO;
/**
 * 修改权限参数校验
 */
class PostTopDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required()),
    __metadata("design:type", Number)
], PostTopDTO.prototype, "id", void 0);
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number().required(), {
        required: true,
        min: 0,
        max: 1
    }),
    __metadata("design:type", Number)
], PostTopDTO.prototype, "top", void 0);
exports.PostTopDTO = PostTopDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdFN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZHRvL3Bvc3RTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBQ3JEOztHQUVHO0FBQ0gsTUFBYSxhQUFhO0NBWXpCO0FBVEc7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3lDQUN4QjtBQVFYO0lBTEMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsRUFBRTtLQUNWLENBQUM7OzZDQUN3QjtBQVg5QixzQ0FZQztBQUVEOztHQUVHO0FBQ0gsTUFBYSxVQUFVO0NBWXRCO0FBVEc7SUFEQyxnQkFBSSxDQUFDLG9CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3NDQUN4QjtBQVFYO0lBTEMsZ0JBQUksQ0FBQyxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztLQUNULENBQUM7O3VDQUNTO0FBWGYsZ0NBWUMifQ==