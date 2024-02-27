import { BaseController } from '@cool-midway/core';
import { AppletsUserService } from '../../service/user';
import { UserRoleDTO } from '../../dto/userRole';
export declare class AppletsUserController extends BaseController {
    appletsUserService: AppletsUserService;
    /**
     * 修改角色
     */
    order(user: UserRoleDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
