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
exports.Material = void 0;
const typeorm_1 = require("typeorm");
const material_type_entity_1 = require("./material-type.entity");
let Material = class Material {
    id;
    parentId;
    materialsNo;
    name;
    unit;
    materialsTypeId;
    nameVi;
    status;
    nameStoreCard;
    price;
    image;
    materialsIdVo;
    description;
    displayOrder;
    nameInvoice;
    weight;
    isTax;
    createdBy;
    createdDate;
    createdDateBigint;
    suppliesAccount;
    costPriceAccount;
    revenueAccount;
    discountAccount;
    materialType;
};
exports.Material = Material;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'mediumint', unsigned: true }),
    __metadata("design:type", Number)
], Material.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'parent_id', default: 0 }),
    __metadata("design:type", Number)
], Material.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'materials_no' }),
    __metadata("design:type", String)
], Material.prototype, "materialsNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext' }),
    __metadata("design:type", String)
], Material.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'materials_type_id', nullable: true }),
    __metadata("design:type", Number)
], Material.prototype, "materialsTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, name: 'name_vi' }),
    __metadata("design:type", String)
], Material.prototype, "nameVi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], Material.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'name_store_card', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "nameStoreCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Material.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'materials_id_vo', default: 0 }),
    __metadata("design:type", Number)
], Material.prototype, "materialsIdVo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'display_order', default: 50 }),
    __metadata("design:type", Number)
], Material.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'name_invoice', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "nameInvoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Material.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'is_tax', default: 2 }),
    __metadata("design:type", Number)
], Material.prototype, "isTax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'created_by', default: 0 }),
    __metadata("design:type", Number)
], Material.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_date' }),
    __metadata("design:type", Date)
], Material.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'created_date_bigint', default: 0 }),
    __metadata("design:type", Number)
], Material.prototype, "createdDateBigint", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'supplies_account', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "suppliesAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'cost_price_account', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "costPriceAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'revenue_account', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "revenueAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 22, name: 'discount_account', nullable: true }),
    __metadata("design:type", String)
], Material.prototype, "discountAccount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => material_type_entity_1.MaterialType),
    (0, typeorm_1.JoinColumn)({ name: 'materials_type_id' }),
    __metadata("design:type", material_type_entity_1.MaterialType)
], Material.prototype, "materialType", void 0);
exports.Material = Material = __decorate([
    (0, typeorm_1.Entity)('gas_gas_materials')
], Material);
//# sourceMappingURL=material.entity.js.map