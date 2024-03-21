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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy9yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxnREFBMEQ7QUFDMUQsMERBQW1FO0FBQ25FLDRCQUE0QjtBQUM1QiwwREFBbUU7QUFDbkUsc0VBQStFO0FBQy9FLG1DQUE4QztBQUM5QyxxQ0FBbUM7QUFFbkM7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGtCQUFXO0lBZ0IvQzs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQWM7UUFDMUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0QixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUs7UUFDbkIsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMs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