import { BaseService, Service } from '/@/cool';
@Service('enrollUser')
class Common extends BaseService {
    /**
     * 数据接口
     */
    page() {
        return this.request({
            url: '/page'
        });
    }
}

export default Common;