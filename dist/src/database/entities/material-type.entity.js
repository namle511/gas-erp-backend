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
exports.MaterialType = void 0;
const typeorm_1 = require("typeorm");
const material_entity_1 = require("./material.entity");
let MaterialType = class MaterialType {
    id;
    name;
    status;
    groupType;
    suppliesAccount;
    costPriceAccount;
    revenueAccount;
    discountAccount;
    returnedAccount;
    linkContent;
    materials;
};
exports.MaterialType = MaterialType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'smallint', unsigned: true }),
    __metadata("design:type", Number)
], MaterialType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MaterialType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], MaterialType.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'group_type', default: 1 }),
    __metadata("design:type", Number)
], MaterialType.prototype, "groupType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'supplies_account', nullable: true }),
    __metadata("design:type", String)
], MaterialType.prototype, "suppliesAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'cost_price_account', nullable: true }),
    __metadata("design:type", String)
], MaterialType.prototype, "costPriceAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'revenue_account', nullable: true }),
    __metadata("design:type", String)
], MaterialType.prototype, "revenueAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'discount_account', nullable: true }),
    __metadata("design:type", String)
], MaterialType.prototype, "discountAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'returned_account', nullable: true }),
    __metadata("design:type", String)
], MaterialType.prototype, "returnedAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'link_content', nullable: true }),
    __metadata("design:type", String)
], MaterialType.prototype, "linkContent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => material_entity_1.Material, (material) => material.materialType),
    __metadata("design:type", Array)
], MaterialType.prototype, "materials", void 0);
exports.MaterialType = MaterialType = __decorate([
    (0, typeorm_1.Entity)('gas_gas_materials_type')
], MaterialType);
//# sourceMappingURL=material-type.entity.js.map