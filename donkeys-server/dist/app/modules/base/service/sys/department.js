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
exports.BaseSysDepartmentService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const department_1 = require("../../entity/sys/department");
const _ = require("lodash");
const role_department_1 = require("../../entity/sys/role_department");
const perms_1 = require("./perms");
/**
 * 描述
 */
let BaseSysDepartmentService = class BaseSysDepartmentService extends core_1.BaseService {
    /**
     * 获得部门菜单
     */
    async list() {
        // 部门权限
        const permsDepartmentArr = await this.baseSysPermsService.departmentIds(this.ctx.admin.userId);
        // 过滤部门权限
        const find = this.baseSysDepartmentEntity.createQueryBuilder();
        if (this.ctx.admin.username !== 'admin')
            find.andWhere('id in (:ids)', {
                ids: !_.isEmpty(permsDepartmentArr) ? permsDepartmentArr : [null]
            });
        find.addOrderBy('orderNum', 'ASC');
        const departments = await find.getMany();
        if (!_.isEmpty(departments)) {
            departments.forEach((e) => {
                const parentMenu = departments.filter((m) => {
                    e.parentId = parseInt(e.parentId + '');
                    if (e.parentId == m.id) {
                        return m.name;
                    }
                });
                if (!_.isEmpty(parentMenu)) {
                    e.parentName = parentMenu[0].name;
                }
            });
        }
        return departments;
    }
    /**
     * 根据多个ID获得部门权限信息
     * @param {[]} roleIds 数组
     * @param isAdmin 是否超管
     */
    async getByRoleIds(roleIds, isAdmin) {
        if (!_.isEmpty(roleIds)) {
            if (isAdmin) {
                const result = await this.baseSysDepartmentEntity.find();
                return result.map((e) => {
                    return e.id;
                });
            }
            const result = await this.baseSysRoleDepartmentEntity.createQueryBuilder().where('roleId in (:roleIds)', { roleIds }).getMany();
            if (!_.isEmpty(result)) {
                return _.uniq(result.map((e) => {
                    return e.departmentId;
                }));
            }
        }
        return [];
    }
    /**
     * 部门排序
     * @param params
     */
    async order(params) {
        for (const e of params) {
            await this.baseSysDepartmentEntity.update(e.id, e);
        }
    }
    /**
     * 删除
     */
    async delete(ids) {
        const { deleteUser } = this.ctx.request.body;
        await this.baseSysDepartmentEntity.delete(ids);
        if (deleteUser) {
            await this.nativeQuery('delete from base_sys_user where departmentId in (?)', [ids]);
        }
        else {
            const topDepartment = await this.baseSysDepartmentEntity.createQueryBuilder().where('parentId is null').getOne();
            if (topDepartment) {
                await this.nativeQuery('update base_sys_user a set a.departmentId = ? where a.departmentId in (?)', [topDepartment.id, ids]);
            }
        }
    }
};
__decorate([
    orm_1.InjectEntityModel(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysDepartmentService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(role_department_1.BaseSysRoleDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysDepartmentService.prototype, "baseSysRoleDepartmentEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysDepartmentService.prototype, "baseSysPermsService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseSysDepartmentService.prototype, "ctx", void 0);
BaseSysDepartmentService = __decorate([
    decorator_1.Provide()
], BaseSysDepartmentService);
exports.BaseSysDepartmentService = BaseSysDepartmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy9kZXBhcnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyw0REFBc0U7QUFDdEUsNEJBQTRCO0FBQzVCLHNFQUErRTtBQUUvRSxtQ0FBOEM7QUFFOUM7O0dBRUc7QUFFSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLGtCQUFXO0lBYXJEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDTixPQUFPO1FBQ1AsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0YsU0FBUztRQUNULE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU87WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQzFCLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3BFLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLE1BQU0sV0FBVyxHQUE4QixNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVwRSxJQUFJLENBQUMsQ0FBQyxD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