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
exports.DemoExcelController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const node_xlsx_1 = require("node-xlsx");
const fs = require("fs");
/**
 * 导入导出
 */
let DemoExcelController = class DemoExcelController extends core_1.BaseController {
    /**
     * 导入
     */
    async import() {
        // 读取上传上来的文件
        const file = this.ctx.request.files[0];
        try {
            // 解析文件
            const data = node_xlsx_1.default.parse(file.filepath);
            console.log(data);
        }
        finally {
            fs.unlinkSync(file.filepath);
        }
        return this.ok();
    }
    /**
     * 导出
     */
    async export() {
        const data = [
            ['姓名', '年龄'],
            ['啊平', 18],
            ['江帅', 19]
        ];
        const buffer = node_xlsx_1.default.build([{ name: '成员', data: data }]);
        const fileName = '导出.xlsx';
        this.ctx.attachment(fileName);
        this.ctx.status = 200;
        this.ctx.body = buffer;
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], DemoExcelController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Post('/import'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoExcelController.prototype, "import", null);
__decorate([
    decorator_1.Get('/export'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoExcelController.prototype, "export", null);
DemoExcelController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], DemoExcelController);
exports.DemoExcelController = DemoExcelController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwuanMiLCJzb3VyY2VSb290IjoiRTovbmV3RUx2L2VybHZ6aWh1d2FpL2RvbmtleXMtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RlbW8vY29udHJvbGxlci9hcHAvZXhjZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWlFO0FBQ2pFLDRDQUFtRTtBQUNuRSx5Q0FBNkI7QUFFN0IseUJBQXlCO0FBRXpCOztHQUVHO0FBR0gsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxxQkFBYztJQUluRDs7T0FFRztJQUVILEtBQUssQ0FBQyxNQUFNO1FBQ1IsWUFBWTtRQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJO1lBQ0EsT0FBTztZQUNQLE1BQU0sSUFBSSxHQUFHLG1CQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCO2dCQUFTO1lBQ04sRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sSUFBSSxHQUFHO1lBQ1QsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ1osQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ1YsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1NBQ2IsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLG1CQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDM0IsQ0FBQztDQUNKLENBQUE7QUFuQ0c7SUFEQyxrQkFBTSxFQUFFOztnREFDSTtBQU1iO0lBREMsZ0JBQUksQ0FBQyxTQUFTLENBQUM7Ozs7aURBWWY7QUFNRDtJQURDLGVBQUcsQ0FBQyxTQUFTLENBQUM7Ozs7aURBWWQ7QUFwQ1EsbUJBQW1CO0lBRi9CLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxFQUFFO0dBQ0osbUJBQW1CLENBcUMvQjtBQXJDWSxrREFBbUIifQ==