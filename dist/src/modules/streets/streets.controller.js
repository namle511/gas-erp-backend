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
exports.StreetsController = void 0;
const common_1 = require("@nestjs/common");
const streets_service_1 = require("./streets.service");
const create_street_dto_1 = require("./dto/create-street.dto");
const update_street_dto_1 = require("./dto/update-street.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let StreetsController = class StreetsController {
    streetsService;
    constructor(streetsService) {
        this.streetsService = streetsService;
    }
    findAll(provinceId, status, search, page, limit) {
        return this.streetsService.findAll({
            provinceId: provinceId ? parseInt(provinceId) : undefined,
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }
    search(keyword) {
        return this.streetsService.search(keyword);
    }
    findByProvince(provinceId) {
        return this.streetsService.findByProvince(provinceId);
    }
    findOne(id) {
        return this.streetsService.findOne(id);
    }
    create(createStreetDto, req) {
        return this.streetsService.create(createStreetDto, req.user.userId);
    }
    update(id, updateStreetDto) {
        return this.streetsService.update(id, updateStreetDto);
    }
    remove(id) {
        return this.streetsService.remove(id);
    }
};
exports.StreetsController = StreetsController;
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
], StreetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StreetsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('province/:provinceId'),
    __param(0, (0, common_1.Param)('provinceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StreetsController.prototype, "findByProvince", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StreetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_street_dto_1.CreateStreetDto, Object]),
    __metadata("design:returntype", void 0)
], StreetsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_street_dto_1.UpdateStreetDto]),
    __metadata("design:returntype", void 0)
], StreetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StreetsController.prototype, "remove", null);
exports.StreetsController = StreetsController = __decorate([
    (0, common_1.Controller)('streets'),
    __metadata("design:paramtypes", [streets_service_1.StreetsService])
], StreetsController);
//# sourceMappingURL=streets.controller.js.map