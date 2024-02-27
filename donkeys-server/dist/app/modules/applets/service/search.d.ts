import { BaseService, ICoolCache } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsPostEntity } from '../entity/post';
import { AppletsUserEntity } from '../entity/user';
import { AppletsHistoryEntity } from '../entity/history';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { AppletsPhotoWallEntity } from '../entity/photoWall';
import { AppletsReplayEntity } from '../entity/reply';
export declare class AppletsSearchService extends BaseService {
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;
    appletsPostEntity: Repository<AppletsPostEntity>;
    appletsUserEntity: Repository<AppletsUserEntity>;
    coolCache: ICoolCache;
    appletsPhotoWallEntity: Repository<AppletsPhotoWallEntity>;
    appletsReplayEntity: Repository<AppletsReplayEntity>;
    /**
     * 分页查询
     * @param param
     */
    page(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
}
