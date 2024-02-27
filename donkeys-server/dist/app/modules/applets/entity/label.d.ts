import { BaseEntity } from '@cool-midway/core';
import { AppletsPostLablelEntity } from './post_label';
/**
 * 标签
 */
export declare class AppletsLabelEntity extends BaseEntity {
    name: string;
    count: number;
    labels: AppletsPostLablelEntity[];
}
