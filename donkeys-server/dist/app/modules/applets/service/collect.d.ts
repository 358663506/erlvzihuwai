import { BaseService, ICoolCache } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsLabelEntity } from '../entity/label';
import { CollectDTO, DelCollectDTO } from '../dto/collect';
import { AppletsCollectEntity } from '../entity/collect';
import { AppletsPostEntity } from '../entity/post';
import { AppletsUserEntity } from '../entity/user';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
export declare class AppletsCollectService extends BaseService {
    appletsCollectEntity: Repository<AppletsCollectEntity>;
    appletsLabelEntity: Repository<AppletsLabelEntity>;
    appletsPostEntity: Repository<AppletsPostEntity>;
    appletsUserEntity: Repository<AppletsUserEntity>;
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;
    coolCache: ICoolCache;
    /**
     * 收藏
     * @param param
     */
    add(param: CollectDTO): Promise<AppletsCollectEntity>;
    /**
     * 取消收藏
     * @param param
     */
    del(param: DelCollectDTO): Promise<string>;
    /**
     * 我的查询
     * @param param
     */
    info(param: CollectDTO): Promise<"" | AppletsCollectEntity>;
    /**
     * 分页查询我的收藏
     * @param param
     */
    page(query: any): Promise<{
        list: AppletsCollectEntity[];
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
}
