"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ipdb = require("ipip-ipdb");
const _ = require("lodash");
/**
 * 帮助类
 */
let Utils = class Utils {
    /**
     * 获得请求IP
     */
    async getReqIP(ctx) {
        const req = ctx.req;
        return req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace('::ffff:', '');
    }
    /**
     * 根据IP获得请求地址
     * @param ip 为空时则为当前请求的IP地址
     */
    async getIpAddr(ctx, ip) {
        try {
            if (!ip) {
                ip = await this.getReqIP(ctx);
            }
            const bst = new ipdb.BaseStation(`${this.baseDir}/app/comm/ipipfree.ipdb`);
            const result = bst.findInfo(ip, 'CN');
            const addArr = [];
            if (result) {
                addArr.push(result.countryName);
                addArr.push(result.regionName);
                addArr.push(result.cityName);
                return _.uniq(addArr).join('');
            }
        }
        catch (err) {
            return '无法获取地址信息';
        }
    }
    /**
     * 去除对象的空值属性
     * @param obj
     */
    async removeEmptyP(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
                delete obj[key];
            }
        });
    }
    /**
     * 线程阻塞毫秒数
     * @param ms
     */
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], Utils.prototype, "baseDir", void 0);
Utils = __decorate([
    decorator_1.Provide()
], Utils);
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9jb21tL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCxrQ0FBa0M7QUFDbEMsNEJBQTRCO0FBRzVCOztHQUVHO0FBRUgsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQUlkOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFZO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFZLEVBQUUsRUFBc0I7UUFDaEQsSUFBSTtZQUNBLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQztZQUNELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLHlCQUF5QixDQUFDLENBQUM7WUFDM0UsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1lBQ3ZCLElBQUksTUFBTSxFQUFFO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEM7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxVQUFVLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDbEUsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsRUFBRTtRQUNKLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0osQ0FBQTtBQXBERztJQURDLGtCQUFNLEVBQUU7O3NDQUNEO0FBRkMsS0FBSztJQURqQixtQkFBTyxFQUFFO0dBQ0csS0FBSyxDQXNEakI7QUF0RFksc0JBQUsifQ==