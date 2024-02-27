import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { AppletsPhotoWallEntity } from '../entity/photoWall';
import { PhotoWallMoveDTO } from '../dto/photoWallMove';
import { AppletsPhotoWallTypeEntity } from '../entity/photoWallType';
import { AppletsHistoryService } from './history';
export declare class AppletsPhotoWallService extends BaseService {
    appletsPhotoWallEntity: Repository<AppletsPhotoWallEntity>;
    appletsHistoryService: AppletsHistoryService;
    appletsPhotoWallTypeEntity: Repository<AppletsPhotoWallTypeEntity>;
    /**
     * 修改分类
     */
    move(param: PhotoWallMoveDTO): Promise<string>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: AppletsPhotoWallEntity[];
        typeInfo: AppletsPhotoWallTypeEntity;
        pagination: {
            page: any;
            size: any;
            total: number;
        };
    }>;
}
