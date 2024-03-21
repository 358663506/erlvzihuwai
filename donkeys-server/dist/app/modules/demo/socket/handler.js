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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi9uZXdFTHYvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9zb2NrZXQvaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsZ0RBQStEO0FBQy9ELHlDQUFtQztBQUVuQzs7R0FFRztBQUdILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFDdEI7OztPQUdHO0lBRUgsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0osQ0FBQTtBQUhHO0lBREMscUJBQVksRUFBRTs7cUNBQ1Usa0JBQU07OytDQUU5QjtBQVJRLGFBQWE7SUFGekIsbUJBQU8sRUFBRTtJQUNULG1CQUFVLENBQUMsR0FBRyxDQUFDO0dBQ0gsYUFBYSxDQVN6QjtBQVRZLHNDQUFhIn0=