"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoGetterQueue = void 0;
const decorator_1 = require("@midwayjs/decorator");
const queue_1 = require("@cool-midway/queue");
/**
 * 主动消费队列
 */
let DemoGetterQueue = class DemoGetterQueue extends queue_1.BaseCoolQueue {
};
DemoGetterQueue = __decorate([
    queue_1.Queue(),
    decorator_1.Scope(decorator_1.ScopeEnum.Singleton),
    decorator_1.Provide()
], DemoGetterQueue);
exports.DemoGetterQueue = DemoGetterQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0dGVyLmpzIiwic291cmNlUm9vdCI6IkQ6L3Byb2plY3QvZXJsdnppaHV3YWkvZG9ua2V5cy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvZGVtby9xdWV1ZS9nZXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQWdFO0FBQ2hFLDhDQUEwRDtBQUUxRDs7R0FFRztBQUlILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEscUJBQWE7Q0FBRyxDQUFBO0FBQXhDLGVBQWU7SUFIM0IsYUFBSyxFQUFFO0lBQ1AsaUJBQUssQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixtQkFBTyxFQUFFO0dBQ0csZUFBZSxDQUF5QjtBQUF4QywwQ0FBZSJ9