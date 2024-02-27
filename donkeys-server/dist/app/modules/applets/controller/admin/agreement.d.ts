import { BaseController } from '@cool-midway/core';
import { AppletsAgreementService } from '../../service/agreement';
import { AgreementQRCodeDTO, AgreementStatusDTO } from '../../dto/agreement';
export declare class AppletsAgreementController extends BaseController {
    appletsAgreementService: AppletsAgreementService;
    /**
     * 修改状态
     */
    order(data: AgreementStatusDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    getAgreementQRCode(data: AgreementQRCodeDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
