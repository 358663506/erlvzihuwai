import { BaseEntity } from '@cool-midway/core';
/**
 * 轮播图
 */
export declare class AppletsCarouselEntity extends BaseEntity {
    name: string;
    url: string;
    img: string;
    urlType: number;
    sort: number;
    status: number;
    remark: string;
}
