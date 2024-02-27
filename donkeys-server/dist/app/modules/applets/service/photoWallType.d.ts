import { BaseService } from '@cool-midway/core';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { Repository } from 'typeorm';
import { AppletsHistoryEntity } from '../entity/history';
import { AppletsCollectEntity } from '../entity/collect';
export declare class AppletsPhotoWallTypeService extends BaseService {
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;
    appletsHistoryEntity: Repository<AppletsHistoryEntity>;
    appletsCollectEntity: Repository<AppletsCollectEntity>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: AppletsPhotoWallTypeEntity[];
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
    /**
     * 删除照片墙
     * @param id
     */
    deleteById(id: number): Promise<string>;
}
