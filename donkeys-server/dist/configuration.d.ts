import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { Application } from 'egg';
export declare class ContainerLifeCycle implements ILifeCycle {
    app: Application;
    onReady(container?: IMidwayContainer): Promise<void>;
    onStop(): Promise<void>;
}
