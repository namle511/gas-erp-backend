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
exports.SellDetail = void 0;
const typeorm_1 = require("typeorm");
const sell_entity_1 = require("./sell.entity");
const material_entity_1 = require("./material.entity");
let SellDetail = class SellDetail {
    id;
    status;
    sellId;
    orderType;
    typeAmount;
    orderTypeStatus;
    customerId;
    typeCustomer;
    saleId;
    monitoringId;
    agentId;
    provinceId;
    uidLogin;
    employeeMaintainId;
    materialsParentId;
    materialsTypeId;
    materialsId;
    qty;
    price;
    priceRoot;
    amount;
    seri;
    createdDateOnly;
    createdDateOnlyBigint;
    qtyDiscount;
    amountDiscount;
    amountBuVo;
    promotionId;
    promotionAmount;
    source;
    gasRemain;
    gasRemainAmount;
    kgEmpty;
    kgHasGas;
    v1DiscountId;
    v1DiscountAmount;
    paymentType;
    promotionExtraId;
    promotionExtraAmount;
    sell;
    material;
};
exports.SellDetail = SellDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], SellDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'sell_id' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "sellId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'order_type', default: 1, comment: '1: normal, 2: bộ bình, 3: Thế chân' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "orderType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', name: 'type_amount', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "typeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'order_type_status', default: 0, comment: 'trạng thái thế chân' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "orderTypeStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'customer_id' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'type_customer' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "typeCustomer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'sale_id', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'monitoring_id', nullable: true }),
    __metadata("design:type", Number)
], SellDetail.prototype, "monitoringId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'agent_id' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "agentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'province_id', nullable: true }),
    __metadata("design:type", Number)
], SellDetail.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'uid_login' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "uidLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'employee_maintain_id', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "employeeMaintainId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'materials_parent_id' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "materialsParentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'materials_type_id', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "materialsTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'materials_id' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "materialsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 2 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], SellDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'price_root', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "priceRoot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], SellDetail.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "seri", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'created_date_only' }),
    __metadata("design:type", Date)
], SellDetail.prototype, "createdDateOnly", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'created_date_only_bigint', default: 0, comment: 'time in second' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "createdDateOnlyBigint", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'qty_discount', default: 0, comment: 'slg chiet khau, only Gas' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "qtyDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'amount_discount', nullable: true, comment: 'tiền CK có thể đại lý sửa' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "amountDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'amount_bu_vo', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "amountBuVo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'promotion_id', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "promotionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'promotion_amount', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "promotionAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'source', default: 1, comment: '1: from c#, 2 from app, 3: callcenter' }),
    __metadata("design:type", Number)
], SellDetail.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, name: 'gas_remain', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "gasRemain", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'gas_remain_amount', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "gasRemainAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, name: 'kg_empty', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "kgEmpty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, name: 'kg_has_gas', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "kgHasGas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'v1_discount_id', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "v1DiscountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'v1_discount_amount', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "v1DiscountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'payment_type', default: 1 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'promotion_extra_id', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "promotionExtraId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'promotion_extra_amount', default: 0 }),
    __metadata("design:type", Number)
], SellDetail.prototype, "promotionExtraAmount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sell_entity_1.Sell, sell => sell.details),
    (0, typeorm_1.JoinColumn)({ name: 'sell_id' }),
    __metadata("design:type", sell_entity_1.Sell)
], SellDetail.prototype, "sell", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => material_entity_1.Material),
    (0, typeorm_1.JoinColumn)({ name: 'materials_id' }),
    __metadata("design:type", material_entity_1.Material)
], SellDetail.prototype, "material", void 0);
exports.SellDetail = SellDetail = __decorate([
    (0, typeorm_1.Entity)('gas_sell_detail')
], SellDetail);
//# sourceMappingURL=sell-detail.entity.js.map