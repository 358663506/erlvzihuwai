/* 微信用户 */
import { Inject, Provide, Post, Body, ALL } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsUserEntity } from '../../entity/user';
import { AppletsUserService } from '../../service/user';
import { UserRoleDTO } from '../../dto/userRole';

/* 微信用户 */
@Provide()
@CoolController({
    api: ['info', 'list', 'page'],
    entity: AppletsUserEntity,
    service: AppletsUserService
})
export class AppletsUserController extends BaseController {
    @Inject()
    appletsUserService: AppletsUserService;
    /**
     * 修改角色
     */
    @Post('/role', { summary: '修改角色' })
    async order(@Body(ALL) user: UserRoleDTO) {
        await this.appletsUserService.role(user);
        return this.ok();
    }
}
