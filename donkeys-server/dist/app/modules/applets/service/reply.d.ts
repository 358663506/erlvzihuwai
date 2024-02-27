import { BaseService } from '@cool-midway/core';
import { AddReplyDTO, PageReplyByPostDTO } from '../dto/reply';
import { AppletsPostEntity } from '../entity/post';
import { Repository } from 'typeorm';
import { AppletsUserEntity } from '../entity/user';
import { AppletsReplayEntity } from '../entity/reply';
export declare class AppletsReplyService extends BaseService {
    appletsPostEntity: Repository<AppletsPostEntity>;
    appletsUserEntity: Repository<AppletsUserEntity>;
    appletsReplayEntity: Repository<AppletsReplayEntity>;
    /**
     * 回复
     * @param param
     */
    add(param: AddReplyDTO): Promise<AppletsReplayEntity>;
    page(query: PageReplyByPostDTO): Promise<{
        list: AppletsReplayEntity[];
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
}
