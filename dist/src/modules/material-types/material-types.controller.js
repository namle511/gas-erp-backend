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
exports.MaterialTypesController = void 0;
const common_1 = require("@nestjs/common");
const material_types_service_1 = require("./material-types.service");
const create_material_type_dto_1 = require("./dto/create-material-type.dto");
const update_material_type_dto_1 = require("./dto/update-material-type.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MaterialTypesController = class MaterialTypesController {
    materialTypesService;
    constructor(materialTypesService) {
        this.materialTypesService = materialTypesService;
    }
    findAll(status, search, page, limit) {
        return this.materialTypesService.findAll({
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    getDropdownList() {
        return this.materialTypesService.getDropdownList();
    }
    findOne(id) {
        return this.materialTypesService.findOne(id);
    }
    create(createDto) {
        return this.materialTypesService.create(createDto);
    }
    update(id, updateDto) {
        return this.materialTypesService.update(id, updateDto);
    }
    remove(id) {
        return this.materialTypesService.remove(id);
    }
};
exports.MaterialTypesController = MaterialTypesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], MaterialTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaterialTypesController.prototype, "getDropdownList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_type_dto_1.CreateMaterialTypeDto]),
    __metadata("design:returntype", void 0)
], MaterialTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_material_type_dto_1.UpdateMaterialTypeDto]),
    __metadata("design:returntype", void 0)
], MaterialTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MaterialTypesController.prototype, "remove", null);
exports.MaterialTypesController = MaterialTypesController = __decorate([
    (0, common_1.Controller)('material-types'),
    __metadata("design:paramtypes", [material_types_service_1.MaterialTypesService])
], MaterialTypesController);
//# sourceMappingURL=material-types.controller.js.map