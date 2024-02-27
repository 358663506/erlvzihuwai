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
exports.SocketHandler = void 0;
const decorator_1 = require("@midwayjs/decorator");
const socket_1 = require("@cool-midway/socket");
const socket_io_1 = require("socket.io");
/**
 * socket的事件
 */
let SocketHandler = class SocketHandler {
    /**
     * 连接成功
     * @param data
     */
    async connection(socket) {
        console.log('socket事件', socket.id, socket.handshake.query);
    }
};
__decorate([
    socket_1.SocketEnvent(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketHandler.prototype, "connection", null);
SocketHandler = __decorate([
    decorator_1.Provide(),
    socket_1.CoolSocket('/')
], SocketHandler);
exports.SocketHandler = SocketHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9wcm9qZWN0L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vc29ja2V0L2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLGdEQUErRDtBQUMvRCx5Q0FBbUM7QUFFbkM7O0dBRUc7QUFHSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBQ3RCOzs7T0FHRztJQUVILEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKLENBQUE7QUFIRztJQURDLHFCQUFZLEVBQUU7O3FDQUNVLGtCQUFNOzsrQ0FFOUI7QUFSUSxhQUFhO0lBRnpCLG1CQUFPLEVBQUU7SUFDVCxtQkFBVSxDQUFDLEdBQUcsQ0FBQztHQUNILGFBQWEsQ0FTekI7QUFUWSxzQ0FBYSJ9