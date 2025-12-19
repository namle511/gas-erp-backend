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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvincesController = void 0;
const common_1 = require("@nestjs/common");
const provinces_service_1 = require("./provinces.service");
const create_province_dto_1 = require("./dto/create-province.dto");
const update_province_dto_1 = require("./dto/update-province.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ProvincesController = class ProvincesController {
    provincesService;
    constructor(provincesService) {
        this.provincesService = provincesService;
    }
    findAll(status, search) {
        return this.provincesService.findAll({
            status: status ? parseInt(status) : undefined,
            search,
        });
    }
    getDropdownList() {
        return this.provincesService.getDropdownList();
    }
    findOne(id) {
        return this.provincesService.findOne(id);
    }
    create(createProvinceDto) {
        return this.provincesService.create(createProvinceDto);
    }
    update(id, updateProvinceDto) {
        return this.provincesService.update(id, updateProvinceDto);
    }
    remove(id) {
        return this.provincesService.remove(id);
    }
};
exports.ProvincesController = ProvincesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "getDropdownList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_province_dto_1.CreateProvinceDto]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_province_dto_1.UpdateProvinceDto]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProvincesController.prototype, "remove", null);
exports.ProvincesController = ProvincesController = __decorate([
    (0, common_1.Controller)('provinces'),
    __metadata("design:paramtypes", [provinces_service_1.ProvincesService])
], ProvincesController);
//# sourceMappingURL=provinces.controller.js.map