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
exports.BaseSysPermsService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const menu_1 = require("./menu");
const role_1 = require("./role");
const department_1 = require("./department");
/**
 * 权限
 */
let BaseSysPermsService = class BaseSysPermsService extends core_1.BaseService {
    /**
     * 刷新权限
     * @param userId 用户ID
     */
    async refreshPerms(userId) {
        const roleIds = await this.baseSysRoleService.getByUser(userId);
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        await this.coolCache.set(`admin:perms:${userId}`, JSON.stringify(perms));
        // 更新部门权限
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, this.ctx.admin.username === 'admin');
        await this.coolCache.set(`admin:department:${userId}`, JSON.stringify(departments));
    }
    /**
     * 获得权限菜单
     * @param roleIds
     */
    async permmenu(roleIds) {
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const menus = await this.baseSysMenuService.getMenus(roleIds, this.ctx.admin.username === 'admin');
        return { perms, menus };
    }
    /**
     * 根据用户ID获得部门权限
     * @param userId
     * @return 部门ID数组
     */
    async departmentIds(userId) {
        const department = await this.coolCache.get(`admin:department:${userId}`);
        if (department) {
            return JSON.parse(department);
        }
        else {
            return [];
        }
    }
};
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], BaseSysPermsService.prototype, "coolCache", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseSysPermsService.prototype, "baseSysMenuService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", role_1.BaseSysRoleService)
], BaseSysPermsService.prototype, "baseSysRoleService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", department_1.BaseSysDepartmentService)
], BaseSysPermsService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseSysPermsService.prototype, "ctx", void 0);
BaseSysPermsService = __decorate([
    decorator_1.Provide()
], BaseSysPermsService);
exports.BaseSysPermsService = BaseSysPermsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybXMuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL3Blcm1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBNEQ7QUFDNUQsaUNBQTRDO0FBQzVDLGlDQUE0QztBQUM1Qyw2Q0FBd0Q7QUFHeEQ7O0dBRUc7QUFFSCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLGtCQUFXO0lBZ0JoRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU07UUFDckIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RCxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLFNBQVM7UUFDVCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUNuSCxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBaUI7UUFDNUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ25HLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWM7UUFDOUIsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLFVBQVUsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQzthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBbERHO0lBREMsa0JBQU0sQ0FBQyxZQUFZLENBQUM7O3NEQUNDO0FBR3RCO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7K0RBQUM7QUFHdkM7SUFEQyxrQkFBTSxFQUFFOzhCQUNXLHlCQUFrQjsrREFBQztBQUd2QztJQURDLGtCQUFNLEVBQUU7OEJBQ2lCLHFDQUF3QjtxRUFBQztBQUduRDtJQURDLGtCQUFNLEVBQUU7O2dEQUNJO0FBZEosbUJBQW1CO0lBRC9CLG1CQUFPLEVBQUU7R0FDRyxtQkFBbUIsQ0FvRC9CO0FBcERZLGtEQUFtQiJ9