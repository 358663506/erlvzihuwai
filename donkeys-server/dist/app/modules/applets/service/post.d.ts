import { BaseService, ICoolCache } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsPostEntity } from '../entity/post';
import { AppletsLabelEntity } from '../entity/label';
import { PostStatusDTO, PostTopDTO } from '../dto/postStatus';
import { AppletsHistoryEntity } from '../entity/history';
import { AppletsCollectEntity } from '../entity/collect';
import { AppletsReplayEntity } from '../entity/reply';
import { AppletsMusterAddressEntity } from "../entity/muster_address";
import { AppletsEnrollMusterAddressEntity } from "../entity/enroll_muster_address";
export declare class AppletsPostService extends BaseService {
    appletsPostEntity: Repository<AppletsPostEntity>;
    appletsLabelEntity: Repository<AppletsLabelEntity>;
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;
    appletsCollectEntity: Repository<AppletsCollectEntity>;
    appletsReplayEntity: Repository<AppletsReplayEntity>;
    coolCache: ICoolCache;
    appletsMusterAddressEntity: Repository<AppletsMusterAddressEntity>;
    appletsEnrollMusterAddressEntity: Repository<AppletsEnrollMusterAddressEntity>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: AppletsPostEntity[];
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
    /**
     * 新增
     * @param param
     */
    add(param: any): Promise<any>;
    /**
     * 修改
     * @param param 数据
     */
    update(param: any): Promise<any>;
    /**
     * 根据ID获得信息
     * @param id
     */
    info(id: any): Promise<AppletsPostEntity>;
    /**
     * 修改状态
     * @param post
     */
    status(post: PostStatusDTO): Promise<void>;
    /**
     * 修改置顶状态
     * @param post
     */
    top(post: PostTopDTO): Promise<void>;
    /**
     * 删除文章
     * @param id
     */
    deleteById(id: number): Promise<string>;
}
