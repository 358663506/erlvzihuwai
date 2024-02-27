import { ALL, Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { AppletsAgreementService } from '../../service/agreement';
import { AppletsAgreementEntity } from '../../entity/agreement';
import { AgreementQRCodeDTO, AgreementStatusDTO } from '../../dto/agreement';

/* 活动发布 */
@Provide()
@CoolController({
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: AppletsAgreementEntity,
    service: AppletsAgreementService
})
export class AppletsAgreementController extends BaseController {
    @Inject()
    appletsAgreementService: AppletsAgreementService;

    /**
     * 修改状态
     */
    @Post('/status', { summary: '修改角色' })
    async order(@Body(ALL) data: AgreementStatusDTO) {
        return this.ok(await this.appletsAgreementService.status(data));
    }

    @Post('/getAgreementQRCode', { summary: '获取协议二维码' })
    async getAgreementQRCode(@Body(ALL) data: AgreementQRCodeDTO) {
        return this.ok(await this.appletsAgreementService.getAgreementQRCode(data.id));
    }
}
