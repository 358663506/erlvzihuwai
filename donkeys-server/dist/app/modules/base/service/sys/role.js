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
exports.BaseSysRoleService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const role_1 = require("../../entity/sys/role");
const user_role_1 = require("../../entity/sys/user_role");
const _ = require("lodash");
const role_menu_1 = require("../../entity/sys/role_menu");
const role_department_1 = require("../../entity/sys/role_department");
const perms_1 = require("./perms");
const typeorm_2 = require("typeorm");
/**
 * 角色
 */
let BaseSysRoleService = class BaseSysRoleService extends core_1.BaseService {
    /**
     * 根据用户ID获得所有用户角色
     * @param userId
     */
    async getByUser(userId) {
        const userRole = await this.baseSysUserRoleEntity.find({ userId });
        if (!_.isEmpty(userRole)) {
            return userRole.map((e) => {
                return e.roleId;
            });
        }
        return [];
    }
    /**
     *
     * @param param
     */
    async modifyAfter(param) {
        if (param.id) {
            this.updatePerms(param.id, param.menuIdList, param.departmentIdList);
        }
    }
    /**
     * 更新权限
     * @param roleId
     * @param menuIdList
     * @param departmentIds
     */
    async updatePerms(roleId, menuIdList, departmentIds = []) {
        // 更新菜单权限
        await this.baseSysRoleMenuEntity.delete({ roleId });
        for (const e of menuIdList) {
            await this.baseSysRoleMenuEntity.save({ roleId, menuId: e });
        }
        // 更新部门权限
        await this.baseSysRoleDepartmentEntity.delete({ roleId });
        for (const departmentId of departmentIds) {
            await this.baseSysRoleDepartmentEntity.save({ roleId, departmentId });
        }
        // 刷新权限
        const userRoles = await this.baseSysUserRoleEntity.find({ roleId });
        for (const userRole of userRoles) {
            await this.baseSysPermsService.refreshPerms(userRole.userId);
        }
    }
    /**
     * 角色信息
     * @param id
     */
    async info(id) {
        const info = await this.baseSysRoleEntity.findOne({ id });
        if (info) {
            const menus = await this.baseSysRoleMenuEntity.find(id !== 1 ? { roleId: id } : {});
            const menuIdList = menus.map((e) => {
                return parseInt(e.menuId + '');
            });
            const departments = await this.baseSysRoleDepartmentEntity.find(id !== 1 ? { roleId: id } : {});
            const departmentIdList = departments.map((e) => {
                return parseInt(e.departmentId + '');
            });
            return {
                ...info,
                menuIdList,
                departmentIdList
            };
        }
        return {};
    }
    async list() {
        return this.baseSysRoleEntity
            .createQueryBuilder()
            .where(new typeorm_2.Brackets((qb) => {
            qb.where('id !=:id', { id: 1 }); // 超级管理员的角色不展示
            // 如果不是超管，只能看到自己新建的或者自己有的角色
            if (this.ctx.admin.username !== 'admin') {
                qb.andWhere('(userId=:userId or id in (:roleId))', {
                    userId: this.ctx.admin.userId,
                    roleId: this.ctx.admin.roleIds
                });
            }
        }))
            .getMany();
    }
};
__decorate([
    orm_1.InjectEntityModel(role_1.BaseSysRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysRoleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(role_menu_1.BaseSysRoleMenuEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysRoleMenuEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(role_department_1.BaseSysRoleDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysRoleDepartmentEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysRoleService.prototype, "baseSysPermsService", void 0);
BaseSysRoleService = __decorate([
    decorator_1.Provide()
], BaseSysRoleService);
exports.BaseSysRoleService = BaseSysRoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQWdEO0FBQ2hELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsZ0RBQTBEO0FBQzFELDBEQUFtRTtBQUNuRSw0QkFBNEI7QUFDNUIsMERBQW1FO0FBQ25FLHNFQUErRTtBQUMvRSxtQ0FBOEM7QUFDOUMscUNBQW1DO0FBRW5DOztHQUVHO0FBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxrQkFBVztJQWdCL0M7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFjO1FBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLO1FBQ25CLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFD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