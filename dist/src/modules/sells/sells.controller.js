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
exports.SellsController = void 0;
const common_1 = require("@nestjs/common");
const sells_service_1 = require("./sells.service");
const create_sell_dto_1 = require("./dto/create-sell.dto");
const update_sell_dto_1 = require("./dto/update-sell.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SellsController = class SellsController {
    sellsService;
    constructor(sellsService) {
        this.sellsService = sellsService;
    }
    getDropdowns() {
        return this.sellsService.getDropdowns();
    }
    getReport(groupBy = 'agent', dateFrom, dateTo, status) {
        return this.sellsService.getReport({
            groupBy,
            dateFrom,
            dateTo,
            status: status ? parseInt(status, 10) : undefined,
        });
    }
    getDashboard(dateFrom, dateTo, provinceId, agentId, materialId, status) {
        return this.sellsService.getDashboard({
            dateFrom,
            dateTo,
            provinceId: provinceId ? parseInt(provinceId, 10) : undefined,
            agentId: agentId ? parseInt(agentId, 10) : undefined,
            materialId: materialId ? parseInt(materialId, 10) : undefined,
            status: status ? parseInt(status, 10) : undefined,
        });
    }
    findAll(page, limit, status, orderType, source, agentId, customerId, dateFrom, dateTo, codeNo, sortBy, sortOrder) {
        return this.sellsService.findAll({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 20,
            status: status ? parseInt(status, 10) : undefined,
            orderType: orderType ? parseInt(orderType, 10) : undefined,
            source: source ? parseInt(source, 10) : undefined,
            agentId: agentId ? parseInt(agentId, 10) : undefined,
            customerId: customerId ? parseInt(customerId, 10) : undefined,
            dateFrom,
            dateTo,
            codeNo,
            sortBy: sortBy || 'id',
            sortOrder: sortOrder || 'DESC',
        });
    }
    findOne(id) {
        return this.sellsService.findOne(id);
    }
    create(createSellDto, req) {
        return this.sellsService.create(createSellDto, req.user.userId);
    }
    update(id, updateSellDto, req) {
        return this.sellsService.update(id, updateSellDto, req.user.userId);
    }
    updateStatus(id, status, statusCancel, req) {
        return this.sellsService.updateStatus(id, status, req.user.userId, statusCancel);
    }
    remove(id) {
        return this.sellsService.remove(id);
    }
    getMobileOrders(page, limit, tab, req) {
        const employeeId = req.user.userId;
        const agentId = req.user.agentId || req.user.areaCodeId || 0;
        return this.sellsService.getMobileOrders(employeeId, agentId, {
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 20,
            tab: tab || 'new',
        });
    }
    pickOrder(id, req) {
        return this.sellsService.pickOrder(id, req.user.userId);
    }
    cancelPick(id, req) {
        return this.sellsService.cancelPick(id, req.user.userId);
    }
    dropOrder(id, statusCancel, req) {
        return this.sellsService.dropOrder(id, req.user.userId, statusCancel);
    }
    completeOrder(id, body, req) {
        return this.sellsService.completeOrder(id, req.user.userId, body);
    }
    getCancelReasons() {
        return this.sellsService.getCancelReasons();
    }
};
exports.SellsController = SellsController;
__decorate([
    (0, common_1.Get)('dropdowns'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "getDropdowns", null);
__decorate([
    (0, common_1.Get)('report'),
    __param(0, (0, common_1.Query)('groupBy')),
    __param(1, (0, common_1.Query)('dateFrom')),
    __param(2, (0, common_1.Query)('dateTo')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "getReport", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Query)('dateFrom')),
    __param(1, (0, common_1.Query)('dateTo')),
    __param(2, (0, common_1.Query)('provinceId')),
    __param(3, (0, common_1.Query)('agentId')),
    __param(4, (0, common_1.Query)('materialId')),
    __param(5, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('orderType')),
    __param(4, (0, common_1.Query)('source')),
    __param(5, (0, common_1.Query)('agentId')),
    __param(6, (0, common_1.Query)('customerId')),
    __param(7, (0, common_1.Query)('dateFrom')),
    __param(8, (0, common_1.Query)('dateTo')),
    __param(9, (0, common_1.Query)('codeNo')),
    __param(10, (0, common_1.Query)('sortBy')),
    __param(11, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sell_dto_1.CreateSellDto, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sell_dto_1.UpdateSellDto, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('statusCancel')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('mobile/orders'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('tab')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "getMobileOrders", null);
__decorate([
    (0, common_1.Post)(':id/pick'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "pickOrder", null);
__decorate([
    (0, common_1.Post)(':id/cancel-pick'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "cancelPick", null);
__decorate([
    (0, common_1.Post)(':id/drop'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('statusCancel', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "dropOrder", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "completeOrder", null);
__decorate([
    (0, common_1.Get)('mobile/cancel-reasons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SellsController.prototype, "getCancelReasons", null);
exports.SellsController = SellsController = __decorate([
    (0, common_1.Controller)('sells'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [sells_service_1.SellsService])
], SellsController);
//# sourceMappingURL=sells.controller.js.map