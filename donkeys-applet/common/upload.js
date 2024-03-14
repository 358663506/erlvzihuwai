import { BaseService, Service } from '/@/cool';
@Service('base/comm')
class Common extends BaseService {
    /**
     * 文件上传模式
     */
    uploadMode() {
        return this.request({
            url: '/uploadMode'
        });
    }

    /**
     * 文件上传，如果模式是 cloud，返回对应参数
     *
     * @returns
     * @memberof CommonService
     */
    upload(params) {
        return this.request({
            url: '/upload',
            method: 'POST',
            params
        });
    }
}

export default Common;
