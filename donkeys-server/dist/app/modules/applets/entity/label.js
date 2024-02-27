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
exports.AppletsLabelEntity = void 0;
/* 标签 */
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const core_1 = require("@cool-midway/core");
const typeorm_2 = require("typeorm");
const post_label_1 = require("./post_label");
/**
 * 标签
 */
let AppletsLabelEntity = class AppletsLabelEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_2.Column({ comment: '标签名称' }),
    __metadata("design:type", String)
], AppletsLabelEntity.prototype, "name", void 0);
__decorate([
    typeorm_2.Column({ comment: '搜索次数', default: 0 }),
    __metadata("design:type", Number)
], AppletsLabelEntity.prototype, "count", void 0);
__decorate([
    typeorm_1.OneToMany(() => post_label_1.AppletsPostLablelEntity, (post_label) => post_label.label),
    __metadata("design:type", Array)
], AppletsLabelEntity.prototype, "labels", void 0);
AppletsLabelEntity = __decorate([
    orm_1.EntityModel('applets_label')
], AppletsLabelEntity);
exports.AppletsLabelEntity = AppletsLabelEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hcHBsZXRzL2VudGl0eS9sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1IsdUNBQTRDO0FBQzVDLHFDQUFvQztBQUNwQyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBQ2pDLDZDQUF1RDtBQUV2RDs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsaUJBQVU7Q0FVakQsQ0FBQTtBQVJHO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7Z0RBQ2Y7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7aURBQzFCO0FBSWQ7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLG9DQUF1QixFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDOztrREFDekM7QUFUekIsa0JBQWtCO0lBRDlCLGlCQUFXLENBQUMsZUFBZSxDQUFDO0dBQ2hCLGtCQUFrQixDQVU5QjtBQVZZLGdEQUFrQiJ9