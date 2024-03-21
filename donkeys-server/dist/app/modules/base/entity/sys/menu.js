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
exports.BaseSysMenuEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 菜单
 */
let BaseSysMenuEntity = class BaseSysMenuEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '父菜单ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "parentId", void 0);
__decorate([
    typeorm_1.Column({ comment: '菜单名称' }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '菜单地址', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "router", void 0);
__decorate([
    typeorm_1.Column({ comment: '权限标识', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "perms", void 0);
__decorate([
    typeorm_1.Column({
        comment: '类型 0：目录 1：菜单 2：按钮',
        default: 0,
        type: 'tinyint'
    }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ comment: '图标', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column({ comment: '排序', default: 0 }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "orderNum", void 0);
__decorate([
    typeorm_1.Column({ comment: '视图地址', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "viewPath", void 0);
__decorate([
    typeorm_1.Column({ comment: '路由缓存', default: true }),
    __metadata("design:type", Boolean)
], BaseSysMenuEntity.prototype, "keepAlive", void 0);
__decorate([
    typeorm_1.Column({ comment: '是否显示', default: true }),
    __metadata("design:type", Boolean)
], BaseSysMenuEntity.prototype, "isShow", void 0);
BaseSysMenuEntity = __decorate([
    orm_1.EntityModel('base_sys_menu')
], BaseSysMenuEntity);
exports.BaseSysMenuEntity = BaseSysMenuEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL21lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLGlCQUFVO0NBcUNoRCxDQUFBO0FBbkNHO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUM1QztBQUdqQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7OytDQUNmO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUM3QjtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDOUI7QUFPZDtJQUxDLGdCQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsSUFBSSxFQUFFLFNBQVM7S0FDbEIsQ0FBQzs7K0NBQ1c7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQzdCO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O21EQUNyQjtBQUdqQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQzNCO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztvREFDeEI7QUFNbkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUMzQjtBQXBDUCxpQkFBaUI7SUFEN0IsaUJBQVcsQ0FBQyxlQUFlLENBQUM7R0FDaEIsaUJBQWlCLENBcUM3QjtBQXJDWSw4Q0FBaUIifQ==