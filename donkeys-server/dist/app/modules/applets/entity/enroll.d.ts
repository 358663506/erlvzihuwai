import { BaseEntity } from '@cool-midway/core';
/**
 * 系统用户
 */
export declare class EnrollEntity extends BaseEntity {
    name: string;
    introduce: string;
    status: number;
    registration_flg: number;
    update_flg: number;
    most_count: number;
    img: string;
}
