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
exports.HistoryDTO = exports.SaveHistoryDTO = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 足迹参数校验
 */
class SaveHistoryDTO {
}
exports.SaveHistoryDTO = SaveHistoryDTO;
class HistoryDTO {
}
__decorate([
    decorator_1.Rule(decorator_1.RuleType.number()),
    __metadata("design:type", Number)
], HistoryDTO.prototype, "id", void 0);
exports.HistoryDTO = HistoryDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcGxldHMvZHRvL2hpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFEO0FBR3JEOztHQUVHO0FBQ0gsTUFBYSxjQUFjO0NBSTFCO0FBSkQsd0NBSUM7QUFFRCxNQUFhLFVBQVU7Q0FJdEI7QUFERztJQURDLGdCQUFJLENBQUMsb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7c0NBQ2I7QUFIZixnQ0FJQyJ9