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
exports.DemoGoodsEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 商品
 */
let DemoGoodsEntity = class DemoGoodsEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '标题' }),
    __metadata("design:type", String)
], DemoGoodsEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ comment: '图片' }),
    __metadata("design:type", String)
], DemoGoodsEntity.prototype, "pic", void 0);
__decorate([
    typeorm_1.Column({ comment: '价格', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ comment: '分类', type: 'tinyint' }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "type", void 0);
DemoGoodsEntity = __decorate([
    orm_1.EntityModel('demo_goods')
], DemoGoodsEntity);
exports.DemoGoodsEntity = DemoGoodsEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vZW50aXR5L2dvb2RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxpQkFBVTtDQVk5QyxDQUFBO0FBVkc7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDWjtBQUdkO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQ2Q7QUFHWjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzhDQUNyRDtBQUdkO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzs2Q0FDOUI7QUFYSixlQUFlO0lBRDNCLGlCQUFXLENBQUMsWUFBWSxDQUFDO0dBQ2IsZUFBZSxDQVkzQjtBQVpZLDBDQUFlIn0=