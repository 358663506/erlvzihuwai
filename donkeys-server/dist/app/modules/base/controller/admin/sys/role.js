"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSysRoleController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const role_1 = require("../../../entity/sys/role");
const role_2 = require("../../../service/sys/role");
/**
 * 系统角色
 */
let BaseSysRoleController = class BaseSysRoleController extends core_1.BaseController {
};
BaseSysRoleController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: role_1.BaseSysRoleEntity,
        service: role_2.BaseSysRoleService,
        // 新增的时候插入当前用户ID
        insertParam: async (ctx) => {
            return {
                userId: ctx.admin.userId
            };
        },
        pageQueryOp: {
            keyWordLikeFields: ['name', 'label'],
            where: async (ctx) => {
                const { userId, roleIds, role } = ctx.admin;
                return [
                    // 超级管理员的角色不展示
                    ['label != :label', { label: 'admin' }],
                    // 如果不是超管，只能看到自己新建的或者自己有的角色
                    ['(userId=:userId or id in (:roleIds))', { userId, roleIds }, role !== 'admin']
                ];
            }
        }
    })
], BaseSysRoleController);
exports.BaseSysRoleController = BaseSysRoleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL3N5cy9yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBbUU7QUFFbkUsbURBQTZEO0FBQzdELG9EQUErRDtBQUUvRDs7R0FFRztBQXlCSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUEvQyxxQkFBcUI7SUF4QmpDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ1osR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLHdCQUFpQjtRQUN6QixPQUFPLEVBQUUseUJBQWtCO1FBQzNCLGdCQUFnQjtRQUNoQixXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO1lBQ2hDLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTthQUMzQixDQUFDO1FBQ04sQ0FBQztRQUNELFdBQVcsRUFBRTtZQUNULGlCQUFpQixFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztZQUNwQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFO2dCQUMxQixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUM1QyxPQUFPO29CQUNILGNBQWM7b0JBQ2QsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztvQkFDdkMsMkJBQTJCO29CQUMzQixDQUFDLHNDQUFzQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksS0FBSyxPQUFPLENBQUM7aUJBQ2xGLENBQUM7WUFDTixDQUFDO1NBQ0o7S0FDSixDQUFDO0dBQ1cscUJBQXFCLENBQTBCO0FBQS9DLHNEQUFxQiJ9