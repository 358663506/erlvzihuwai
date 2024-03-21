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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy9tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxnREFBMEQ7QUFDMUQsNEJBQTRCO0FBRTVCLG1DQUE4QztBQUU5Qzs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsa0JBQVc7SUFVL0M7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSTtRQUNOLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNsQyxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNwQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7cUJBQ2pCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN4QixDQUFDLENBQUMsVUFBVSxH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