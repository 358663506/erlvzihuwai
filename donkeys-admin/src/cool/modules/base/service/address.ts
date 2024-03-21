import { BaseService, Service } from '/@/cool';
@Service('musterAdress')
class Common extends BaseService {
  
    /**
     * 活动地址
     */
    address() {
        return this.request({
            url: '/page'
        });
    }
}

export default Common;
