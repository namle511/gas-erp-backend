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
exports.DistrictsController = void 0;
const common_1 = require("@nestjs/common");
const districts_service_1 = require("./districts.service");
const create_district_dto_1 = require("./dto/create-district.dto");
const update_district_dto_1 = require("./dto/update-district.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DistrictsController = class DistrictsController {
    districtsService;
    constructor(districtsService) {
        this.districtsService = districtsService;
    }
    findAll(provinceId, status, search, page, limit) {
        return this.districtsService.findAll({
            provinceId: provinceId ? parseInt(provinceId) : undefined,
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    getByProvince(provinceId) {
        return this.districtsService.getByProvince(provinceId);
    }
    findOne(id) {
        return this.districtsService.findOne(id);
    }
    create(createDistrictDto, req) {
        return this.districtsService.create(createDistrictDto, req.user.userId);
    }
    update(id, updateDistrictDto) {
        return this.districtsService.update(id, updateDistrictDto);
    }
    remove(id) {
        return this.districtsService.remove(id);
    }
};
exports.DistrictsController = DistrictsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('provinceId')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], DistrictsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-province/:provinceId'),
    __param(0, (0, common_1.Param)('provinceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DistrictsController.prototype, "getByProvince", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DistrictsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_district_dto_1.CreateDistrictDto, Object]),
    __metadata("design:returntype", void 0)
], DistrictsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_district_dto_1.UpdateDistrictDto]),
    __metadata("design:returntype", void 0)
], DistrictsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DistrictsController.prototype, "remove", null);
exports.DistrictsController = DistrictsController = __decorate([
    (0, common_1.Controller)('districts'),
    __metadata("design:paramtypes", [districts_service_1.DistrictsService])
], DistrictsController);
//# sourceMappingURL=districts.controller.js.map