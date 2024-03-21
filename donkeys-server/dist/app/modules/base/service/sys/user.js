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
exports.BaseSysUserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/sys/user");
const perms_1 = require("./perms");
const _ = require("lodash");
const user_role_1 = require("../../entity/sys/user_role");
const md5 = require("md5");
const department_1 = require("../../entity/sys/department");
/**
 * 系统用户
 */
let BaseSysUserService = class BaseSysUserService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { keyWord, status, departmentIds = [] } = query;
        const permsDepartmentArr = await this.baseSysPermsService.departmentIds(this.ctx.admin.userId); // 部门权限
        const sql = `
        SELECT
            a.id,a.name,a.nickName,a.headImg,a.email,a.remark,a.status,a.createTime,a.updateTime,a.username,a.phone,a.departmentId,
            GROUP_CONCAT(c.name) AS roleName,
            d.name as departmentName
        FROM
            base_sys_user a
            LEFT JOIN base_sys_user_role b ON a.id = b.userId
            LEFT JOIN base_sys_role c ON b.roleId = c.id
            LEFT JOIN base_sys_department d on a.departmentId = d.id
        WHERE 1 = 1
            ${this.setSql(!_.isEmpty(departmentIds), 'and a.departmentId in (?)', [departmentIds])}
            ${this.setSql(status, 'and a.status = ?', [status])}
            ${this.setSql(keyWord, 'and (a.name LIKE ? or a.username LIKE ?)', [`%${keyWord}%`, `%${keyWord}%`])}
            ${this.setSql(true, 'and a.username != ?', ['admin'])}
            ${this.setSql(this.ctx.admin.username !== 'admin', 'and a.departmentId in (?)', [!_.isEmpty(permsDepartmentArr) ? permsDepartmentArr : [null]])}
        GROUP BY a.id
        `;
        return this.sqlRenderPage(sql, query);
    }
    /**
     * 移动部门
     * @param departmentId
     * @param userIds
     */
    async move(departmentId, userIds) {
        await this.baseSysUserEntity.createQueryBuilder().update().set({ departmentId }).where('id in (:userIds)', { userIds }).execute();
    }
    /**
     * 获得个人信息
     */
    async person() {
        var _a;
        const info = await this.baseSysUserEntity.findOne({
            id: (_a = this.ctx.admin) === null || _a === void 0 ? void 0 : _a.userId
        });
        info === null || info === void 0 ? true : delete info.password;
        return info;
    }
    /**
     * 更新用户角色关系
     * @param user
     */
    async updateUserRole(user) {
        if (user.username === 'admin') {
            throw new core_1.CoolCommException('非法操作~');
        }
        await this.baseSysUserRoleEntity.delete({ userId: user.id });
        if (user.roleIdList) {
            for (const roleId of user.roleIdList) {
                await this.baseSysUserRoleEntity.save({ userId: user.id, roleId });
            }
        }
        await this.baseSysPermsService.refreshPerms(user.id);
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        const exists = await this.baseSysUserEntity.findOne({
            username: param.username
        });
        if (!_.isEmpty(exists)) {
            throw new core_1.CoolCommException('用户名已经存在~');
        }
        param.password = md5(param.password);
        await this.baseSysUserEntity.save(param);
        await this.updateUserRole(param);
        return param.id;
    }
    /**
     * 根据ID获得信息
     * @param id
     */
    async info(id) {
        const info = await this.baseSysUserEntity.findOne({ id });
        const userRoles = await this.nativeQuery('select a.roleId from base_sys_user_role a where a.userId = ?', [id]);
        const department = await this.baseSysDepartmentEntity.findOne({
            id: info.departmentId
        });
        if (info) {
            delete info.password;
            if (userRoles) {
                info.roleIdList = userRoles.map((e) => {
                    return parseInt(e.roleId);
                });
            }
        }
        delete info.password;
        if (department) {
            info.departmentName = department.name;
        }
        return info;
    }
    /**
     * 修改个人信息
     * @param param
     */
    async personUpdate(param) {
        param.id = this.ctx.admin.userId;
        if (!_.isEmpty(param.password)) {
            param.password = md5(param.password);
            const userInfo = await this.baseSysUserEntity.findOne({ id: param.id });
            if (!userInfo) {
                throw new core_1.CoolCommException('用户不存在');
            }
            param.passwordV = userInfo.passwordV + 1;
            await this.coolCache.set(`admin:passwordVersion:${param.id}`, param.passwordV);
        }
        else {
            delete param.password;
        }
        await this.baseSysUserEntity.save(param);
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        if (param.id && param.username === 'admin') {
            throw new core_1.CoolCommException('非法操作~');
        }
        if (!_.isEmpty(param.password)) {
            param.password = md5(param.password);
            const userInfo = await this.baseSysUserEntity.findOne({ id: param.id });
            if (!userInfo) {
                throw new core_1.CoolCommException('用户不存在');
            }
            param.passwordV = userInfo.passwordV + 1;
            await this.coolCache.set(`admin:passwordVersion:${param.id}`, param.passwordV);
        }
        else {
            delete param.password;
        }
        if (param.status === 0) {
            await this.forbidden(param.id);
        }
        await this.baseSysUserEntity.save(param);
        await this.updateUserRole(param);
    }
    /**
     * 禁用用户
     * @param userId
     */
    async forbidden(userId) {
        await this.coolCache.del(`admin:token:${userId}`);
    }
};
__decorate([
    orm_1.InjectEntityModel(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysUserService.prototype, "baseSysUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysUserService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysUserService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    decorator_1.Inject('cool:cache'),
    __metadata("design:type", Object)
], BaseSysUserService.prototype, "coolCache", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysUserService.prototype, "baseSysPermsService", void 0);
BaseSysUserService = __decorate([
    decorator_1.Provide()
], BaseSysUserService);
exports.BaseSysUserService = BaseSysUserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBK0U7QUFDL0UsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxnREFBMEQ7QUFDMUQsbUNBQThDO0FBQzlDLDRCQUE0QjtBQUM1QiwwREFBbUU7QUFDbkUsMkJBQTJCO0FBQzNCLDREQUFzRTtBQUV0RTs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsa0JBQVc7SUFnQi9DOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNaLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDdEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO1FBQ3ZHLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7OztjQVdOLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLDJCQUEyQixFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7Y0FDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztjQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxDQUFDLElBQUksT0FBTyxHQUFHLEVBQUUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO2NBQ2xHLElBQUksQ0FBQyxN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