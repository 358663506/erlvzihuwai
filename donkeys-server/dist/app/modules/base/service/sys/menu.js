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
exports.BaseSysMenuService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const menu_1 = require("../../entity/sys/menu");
const _ = require("lodash");
const perms_1 = require("./perms");
/**
 * 菜单
 */
let BaseSysMenuService = class BaseSysMenuService extends core_1.BaseService {
    /**
     * 获得所有菜单
     */
    async list() {
        const menus = await this.getMenus(this.ctx.admin.roleIds, this.ctx.admin.username === 'admin');
        if (!_.isEmpty(menus)) {
            menus.forEach((e) => {
                const parentMenu = menus.filter((m) => {
                    e.parentId = parseInt(e.parentId);
                    if (e.parentId == m.id) {
                        return m.name;
                    }
                });
                if (!_.isEmpty(parentMenu)) {
                    e.parentName = parentMenu[0].name;
                }
            });
        }
        return menus;
    }
    /**
     * 修改之后
     * @param param
     */
    async modifyAfter(param) {
        if (param.id) {
            await this.refreshPerms(param.id);
        }
    }
    /**
     * 根据角色获得权限信息
     * @param {[]} roleIds 数组
     */
    async getPerms(roleIds) {
        let perms = [];
        if (!_.isEmpty(roleIds)) {
            const result = await this.nativeQuery(`SELECT a.perms FROM base_sys_menu a ${this.setSql(!roleIds.includes('1'), 'JOIN base_sys_role_menu b on a.id = b.menuId AND b.roleId in (?)', [roleIds])}
            where 1=1 and a.perms is not NULL
            `, [roleIds]);
            if (result) {
                result.forEach((d) => {
                    if (d.perms) {
                        perms = perms.concat(d.perms.split(','));
                    }
                });
            }
            perms = _.uniq(perms);
            perms = _.remove(perms, (n) => {
                return !_.isEmpty(n);
            });
        }
        return _.uniq(perms);
    }
    /**
     * 获得用户菜单信息
     * @param roleIds
     * @param isAdmin 是否是超管
     */
    async getMenus(roleIds, isAdmin) {
        return await this.nativeQuery(`
        SELECT
            a.*
        FROM
            base_sys_menu a
        ${this.setSql(!isAdmin, 'JOIN base_sys_role_menu b on a.id = b.menuId AND b.roleId in (?)', [roleIds])}
        GROUP BY a.id
        ORDER BY
            orderNum ASC`);
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            await this.baseSysMenuEntity.delete({ id });
            await this.delChildMenu(id);
        }
    }
    /**
     * 删除子菜单
     * @param id
     */
    async delChildMenu(id) {
        await this.refreshPerms(id);
        const delMenu = await this.baseSysMenuEntity.find({ parentId: id });
        if (_.isEmpty(delMenu)) {
            return;
        }
        const delMenuIds = delMenu.map((e) => {
            return e.id;
        });
        await this.baseSysMenuEntity.delete(delMenuIds);
        for (const menuId of delMenuIds) {
            await this.delChildMenu(menuId);
        }
    }
    /**
     * 更新权限
     * @param menuId
     */
    async refreshPerms(menuId) {
        const users = await this.nativeQuery('select b.userId from base_sys_role_menu a left join base_sys_user_role b on a.roleId = b.roleId where a.menuId = ? group by b.userId', [menuId]);
        // 刷新admin权限
        await this.baseSysPermsService.refreshPerms(1);
        if (!_.isEmpty(users)) {
            // 刷新其他权限
            for (const user of users) {
                await this.baseSysPermsService.refreshPerms(user.userId);
            }
        }
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseSysMenuService.prototype, "ctx", void 0);
__decorate([
    orm_1.InjectEntityModel(menu_1.BaseSysMenuEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysMenuService.prototype, "baseSysMenuEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysMenuService.prototype, "baseSysPermsService", void 0);
BaseSysMenuService = __decorate([
    decorator_1.Provide()
], BaseSysMenuService);
exports.BaseSysMenuService = BaseSysMenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQWdEO0FBQ2hELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsZ0RBQTBEO0FBQzFELDRCQUE0QjtBQUU1QixtQ0FBOEM7QUFFOUM7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGtCQUFXO0lBVS9DOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDTixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDbEMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDcEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO3FCQUNqQjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDeEIsQ0FBQyxDQUFDLFVBQVUs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