import { BaseService, ICoolCache } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsLabelEntity } from '../entity/label';
import { AppletsPostEntity } from '../entity/post';
import { AppletsUserEntity } from '../entity/user';
import { AppletsHistoryEntity } from '../entity/history';
import { HistoryDTO, SaveHistoryDTO } from '../dto/history';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
export declare class AppletsHistoryService extends BaseService {
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;
    appletsLabelEntity: Repository<AppletsLabelEntity>;
    appletsPostEntity: Repository<AppletsPostEntity>;
    appletsUserEntity: Repository<AppletsUserEntity>;
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;
    coolCache: ICoolCache;
    /**
     * 足迹（添加及更新）
     * @param param
     */
    save(param: SaveHistoryDTO): Promise<string>;
    /**
     * 删除足迹
     * @param param
     */
    del(param: HistoryDTO): Promise<string>;
    /**
     * 分页查询
     * @param param
     */
    page(query: any): Promise<{
        list: AppletsHistoryEntity[];
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
}
