import { Socket } from 'socket.io';
/**
 * socket的事件
 */
export declare class SocketHandler {
    /**
     * 连接成功
     * @param data
     */
    connection(socket: Socket): Promise<void>;
}
