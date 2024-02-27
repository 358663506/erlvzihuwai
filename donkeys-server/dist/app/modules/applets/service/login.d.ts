import { BaseService, ICoolCache } from '@cool-midway/core';
import { Iconfig } from '../config';
import { WeLoginByCodeDTO, WeLoginDTO } from '../dto/login';
import { AppletsUserEntity } from '../entity/user';
import { Repository } from 'typeorm';
import { Context } from 'egg';
/**
 * 登录
 */
export declare class AppletsLoginService extends BaseService {
    coolCache: ICoolCache;
    appletsUserEntity: Repository<AppletsUserEntity>;
    ctx: Context;
    coolConfig: Iconfig;
    /**
     * 登录
     * @param login
     */
    login(login: WeLoginDTO): Promise<{
        expire: number;
        token: string;
        refreshExpire: number;
        refreshToken: string;
        username: string;
        password: string;
        nickName: string;
        openId: string;
        avatarUrl: string;
        gender: number;
        city: string;
        province: string;
        country: string;
        unionId: string;
        location: string;
        role: number;
        phone: string;
        email: string;
        postCount: number;
        posts: import("../entity/post").AppletsPostEntity[];
        replyCount: number;
        replys: import("../entity/reply").AppletsReplayEntity[];
        collectCount: number;
        collects: import("../entity/collect").AppletsCollectEntity[];
        historyCount: number;
        historys: import("../entity/history").AppletsHistoryEntity[];
        accessToken: string;
        socketId: string;
        remark: string;
        autographs: import("../entity/autograph").AppletsAutographEntity[];
        id: number;
        createTime: Date;
        updateTime: Date;
    }>;
    /**
     * 登录
     * @param login
     */
    loginBefore(login: WeLoginByCodeDTO): Promise<any>;
    /**
     * 生成 token
     * @param user 用户对象
     * @param expire 过期
     * @param isRefresh 是否是刷新
     */
    generateToken(user: any, expire: any, isRefresh?: any): Promise<string>;
    /**
     * 刷新token
     * @param token
     */
    refreshToken(token: string): Promise<{
        expire: number;
        token: string;
        refreshExpire: number;
        refreshToken: string;
    }>;
    setAppletsParams(): Promise<void>;
}
