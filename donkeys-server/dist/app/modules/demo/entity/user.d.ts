import { BaseEntity } from '@cool-midway/core';
/**
 * 实体类crud demo
 */
export declare class DemoUserEntity extends BaseEntity {
    headImg: string;
    name: string;
    age: number;
    birthDate: Date;
    type: number;
    introduce: string;
}
