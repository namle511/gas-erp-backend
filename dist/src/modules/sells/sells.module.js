"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sells_service_1 = require("./sells.service");
const sells_controller_1 = require("./sells.controller");
const sell_entity_1 = require("../../database/entities/sell.entity");
const sell_detail_entity_1 = require("../../database/entities/sell-detail.entity");
let SellsModule = class SellsModule {
};
exports.SellsModule = SellsModule;
exports.SellsModule = SellsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sell_entity_1.Sell, sell_detail_entity_1.SellDetail])],
        controllers: [sells_controller_1.SellsController],
        providers: [sells_service_1.SellsService],
        exports: [sells_service_1.SellsService],
    })
], SellsModule);
//# sourceMappingURL=sells.module.js.map