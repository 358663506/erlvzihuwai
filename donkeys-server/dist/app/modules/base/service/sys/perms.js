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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybXMuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvcGVybXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUE0RDtBQUM1RCxpQ0FBNEM7QUFDNUMsaUNBQTRDO0FBQzVDLDZDQUF3RDtBQUd4RDs7R0FFRztBQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsa0JBQVc7SUFnQmhEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTTtRQUNyQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekUsU0FBUztRQUNULE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ25ILE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFpQjtRQUM1QixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUM7UUFDbkcsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBYztRQUM5QixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksVUFBVSxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFsREc7SUFEQyxrQkFBTSxDQUFDLFlBQVksQ0FBQzs7c0RBQ0M7QUFHdEI7SUFEQyxrQkFBTSxFQUFFOzhCQUNXLHlCQUFrQjsrREFBQztBQUd2QztJQURDLGtCQUFNLEVBQUU7OEJBQ1cseUJBQWtCOytEQUFDO0FBR3ZDO0lBREMsa0JBQU0sRUFBRTs4QkFDaUIscUNBQXdCO3FFQUFDO0FBR25EO0lBREMsa0JBQU0sRUFBRTs7Z0RBQ0k7QUFkSixtQkFBbUI7SUFEL0IsbUJBQU8sRUFBRTtHQUNHLG1CQUFtQixDQW9EL0I7QUFwRFksa0RBQW1CIn0=