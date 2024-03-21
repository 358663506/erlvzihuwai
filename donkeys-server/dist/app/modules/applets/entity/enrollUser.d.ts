import { BaseEntity } from '@cool-midway/core';
/**
 * 系统用户
 */
export declare class EnrollUserEntity extends BaseEntity {
    enroll_id: number;
    name: string;
    mobile: string;
    enroll_muster_address_id: number;
    driver_flg: number;
    driver_address: string;
    real_name: string;
    id_card: string;
    policy_no: string;
    policy_img: string;
    dinner_lfg: number;
    emergency_contact: string;
    emergency_contact_mobile: string;
    openid: string;
    unionid: string;
    status: number;
    sex: string;
    policy_flg: number;
}
