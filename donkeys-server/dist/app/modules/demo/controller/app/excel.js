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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwuanMiLCJzb3VyY2VSb290IjoiRDovcHJvamVjdC9lcmx2emlodXdhaS9kb25rZXlzLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL2V4Y2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFpRTtBQUNqRSw0Q0FBbUU7QUFDbkUseUNBQTZCO0FBRTdCLHlCQUF5QjtBQUV6Qjs7R0FFRztBQUdILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEscUJBQWM7SUFJbkQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNSLFlBQVk7UUFDWixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSTtZQUNBLE9BQU87WUFDUCxNQUFNLElBQUksR0FBRyxtQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtnQkFBUztZQUNOLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE1BQU07UUFDUixNQUFNLElBQUksR0FBRztZQUNULENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUNaLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNWLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztTQUNiLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxtQkFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQzNCLENBQUM7Q0FDSixDQUFBO0FBbkNHO0lBREMsa0JBQU0sRUFBRTs7Z0RBQ0k7QUFNYjtJQURDLGdCQUFJLENBQUMsU0FBUyxDQUFDOzs7O2lEQVlmO0FBTUQ7SUFEQyxlQUFHLENBQUMsU0FBUyxDQUFDOzs7O2lEQVlkO0FBcENRLG1CQUFtQjtJQUYvQixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLG1CQUFtQixDQXFDL0I7QUFyQ1ksa0RBQW1CIn0=