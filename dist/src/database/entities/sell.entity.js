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
exports.Sell = exports.SellPaymentType = exports.SellSource = exports.SellOrderType = exports.SellStatus = void 0;
const typeorm_1 = require("typeorm");
const sell_detail_entity_1 = require("./sell-detail.entity");
const user_entity_1 = require("./user.entity");
var SellStatus;
(function (SellStatus) {
    SellStatus[SellStatus["NEW"] = 1] = "NEW";
    SellStatus[SellStatus["PAID"] = 2] = "PAID";
    SellStatus[SellStatus["CANCEL"] = 3] = "CANCEL";
})(SellStatus || (exports.SellStatus = SellStatus = {}));
var SellOrderType;
(function (SellOrderType) {
    SellOrderType[SellOrderType["NORMAL"] = 1] = "NORMAL";
    SellOrderType[SellOrderType["BO_BINH"] = 2] = "BO_BINH";
    SellOrderType[SellOrderType["THE_CHAN"] = 3] = "THE_CHAN";
    SellOrderType[SellOrderType["THU_VO"] = 4] = "THU_VO";
    SellOrderType[SellOrderType["BAN_GAS_VO"] = 5] = "BAN_GAS_VO";
    SellOrderType[SellOrderType["WATER"] = 6] = "WATER";
    SellOrderType[SellOrderType["WATER_THE_CHAN"] = 7] = "WATER_THE_CHAN";
    SellOrderType[SellOrderType["WATER_THU_VO"] = 8] = "WATER_THU_VO";
    SellOrderType[SellOrderType["FREE"] = 9] = "FREE";
    SellOrderType[SellOrderType["CONSUMER_GOODS"] = 10] = "CONSUMER_GOODS";
    SellOrderType[SellOrderType["ELECTRIC"] = 11] = "ELECTRIC";
    SellOrderType[SellOrderType["GIAT_UI"] = 12] = "GIAT_UI";
})(SellOrderType || (exports.SellOrderType = SellOrderType = {}));
var SellSource;
(function (SellSource) {
    SellSource[SellSource["WINDOW"] = 1] = "WINDOW";
    SellSource[SellSource["APP"] = 2] = "APP";
    SellSource[SellSource["WEB"] = 3] = "WEB";
    SellSource[SellSource["AUTO_SALES"] = 4] = "AUTO_SALES";
    SellSource[SellSource["MOMO"] = 5] = "MOMO";
    SellSource[SellSource["SENDO"] = 6] = "SENDO";
    SellSource[SellSource["TIKI"] = 7] = "TIKI";
    SellSource[SellSource["HIFPT"] = 8] = "HIFPT";
    SellSource[SellSource["WEB_GAS24H"] = 9] = "WEB_GAS24H";
    SellSource[SellSource["TECHRES"] = 10] = "TECHRES";
})(SellSource || (exports.SellSource = SellSource = {}));
var SellPaymentType;
(function (SellPaymentType) {
    SellPaymentType[SellPaymentType["CASH"] = 1] = "CASH";
    SellPaymentType[SellPaymentType["VNPAY"] = 2] = "VNPAY";
    SellPaymentType[SellPaymentType["MOMO"] = 3] = "MOMO";
    SellPaymentType[SellPaymentType["SENDO"] = 4] = "SENDO";
    SellPaymentType[SellPaymentType["NAPAS"] = 5] = "NAPAS";
    SellPaymentType[SellPaymentType["TIKI"] = 6] = "TIKI";
    SellPaymentType[SellPaymentType["HIFPT"] = 7] = "HIFPT";
    SellPaymentType[SellPaymentType["QR_BANK_TRANSFER"] = 8] = "QR_BANK_TRANSFER";
})(SellPaymentType || (exports.SellPaymentType = SellPaymentType = {}));
let Sell = class Sell {
    id;
    firstOrder;
    source;
    status;
    statusCancel;
    codeNo;
    orderType;
    typeAmount;
    orderTypeStatus;
    customerId;
    typeCustomer;
    phone;
    saleId;
    firstName;
    agentId;
    provinceId;
    employeeMaintainId;
    roleIdEmployee;
    uidLogin;
    callCenterId;
    createdDateOnly;
    createdDate;
    note;
    lastUpdateBy;
    lastUpdateTime;
    qtyDiscount;
    amountDiscount;
    amountBuVo;
    transactionHistoryId;
    appPromotionUserId;
    promotionId;
    promotionAmount;
    promotionType;
    total;
    grandTotal;
    address;
    supportId;
    ptttCode;
    callId;
    callEndTime;
    highPrice;
    completeTime;
    customerNew;
    platform;
    v1DiscountAmount;
    v1DiscountId;
    gasRemain;
    gasRemainAmount;
    kgEmpty;
    kgHasGas;
    deliveryTimer;
    isTimer;
    paymentType;
    refcode;
    codePartnerId;
    promotionExtraId;
    promotionExtraAmount;
    datePaid;
    customer;
    agent;
    employeeMaintain;
    sale;
    userLogin;
    details;
};
exports.Sell = Sell;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Sell.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'first_order', default: 0, comment: '1: is first order' }),
    __metadata("design:type", Number)
], Sell.prototype, "firstOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1, comment: '1: from c#, 2 from app, 3: callcenter' }),
    __metadata("design:type", Number)
], Sell.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], Sell.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'status_cancel', default: 0, comment: 'lý do hủy đơn hàng' }),
    __metadata("design:type", Number)
], Sell.prototype, "statusCancel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, name: 'code_no' }),
    __metadata("design:type", String)
], Sell.prototype, "codeNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'order_type', default: 1, comment: '1: normal, 2: bộ bình, 3: Thế chân' }),
    __metadata("design:type", Number)
], Sell.prototype, "orderType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'type_amount', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "typeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'order_type_status', default: 0, comment: 'trạng thái thế chân' }),
    __metadata("design:type", Number)
], Sell.prototype, "orderTypeStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'customer_id' }),
    __metadata("design:type", Number)
], Sell.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'type_customer' }),
    __metadata("design:type", Number)
], Sell.prototype, "typeCustomer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Sell.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'sale_id', nullable: true }),
    __metadata("design:type", Number)
], Sell.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'first_name', nullable: true }),
    __metadata("design:type", String)
], Sell.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'agent_id' }),
    __metadata("design:type", Number)
], Sell.prototype, "agentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'province_id', nullable: true }),
    __metadata("design:type", Number)
], Sell.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'employee_maintain_id', nullable: true }),
    __metadata("design:type", Number)
], Sell.prototype, "employeeMaintainId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'role_id_employee', nullable: true }),
    __metadata("design:type", Number)
], Sell.prototype, "roleIdEmployee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'uid_login', comment: 'NV kế toán BH tạo order' }),
    __metadata("design:type", Number)
], Sell.prototype, "uidLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'call_center_id', default: 0, comment: 'id nv tong dai' }),
    __metadata("design:type", Number)
], Sell.prototype, "callCenterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'created_date_only' }),
    __metadata("design:type", Date)
], Sell.prototype, "createdDateOnly", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'created_date', nullable: true }),
    __metadata("design:type", Date)
], Sell.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Sell.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'last_update_by', nullable: true }),
    __metadata("design:type", Number)
], Sell.prototype, "lastUpdateBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'last_update_time', nullable: true }),
    __metadata("design:type", Date)
], Sell.prototype, "lastUpdateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'qty_discount', default: 0, comment: 'slg chiet khau, ko lay qua KM' }),
    __metadata("design:type", Number)
], Sell.prototype, "qtyDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'amount_discount', default: 0, comment: 'tiền CK có thể đại lý sửa' }),
    __metadata("design:type", Number)
], Sell.prototype, "amountDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'amount_bu_vo', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "amountBuVo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'transaction_history_id', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "transactionHistoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'app_promotion_user_id', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "appPromotionUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'promotion_id', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "promotionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'promotion_amount', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "promotionAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'promotion_type', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "promotionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'grand_total', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "grandTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', nullable: true }),
    __metadata("design:type", String)
], Sell.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'support_id', default: 0, comment: 'loại hỗ trợ NVGN' }),
    __metadata("design:type", Number)
], Sell.prototype, "supportId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5, name: 'pttt_code', default: '' }),
    __metadata("design:type", String)
], Sell.prototype, "ptttCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'call_id', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "callId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'call_end_time', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "callEndTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'high_price', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "highPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'complete_time', nullable: true }),
    __metadata("design:type", Date)
], Sell.prototype, "completeTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'customer_new', default: 0, comment: '1: KH new, 2: old' }),
    __metadata("design:type", Number)
], Sell.prototype, "customerNew", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 0, comment: '0: web, 1: android, 2: ios' }),
    __metadata("design:type", Number)
], Sell.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'v1_discount_amount', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "v1DiscountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'v1_discount_id', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "v1DiscountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, name: 'gas_remain', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "gasRemain", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'gas_remain_amount', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "gasRemainAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, name: 'kg_empty', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "kgEmpty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, name: 'kg_has_gas', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "kgHasGas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'delivery_timer', nullable: true, comment: 'hen gio giao hang' }),
    __metadata("design:type", Object)
], Sell.prototype, "deliveryTimer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'is_timer', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "isTimer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'payment_type', default: 1, comment: '1: Cash, 2: Bank' }),
    __metadata("design:type", Number)
], Sell.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Sell.prototype, "refcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'code_partner_id', default: 0, comment: 'id ưu đãi đổi thưởng' }),
    __metadata("design:type", Number)
], Sell.prototype, "codePartnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'promotion_extra_id', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "promotionExtraId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'promotion_extra_amount', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "promotionExtraAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'date_paid', default: 0 }),
    __metadata("design:type", Number)
], Sell.prototype, "datePaid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", user_entity_1.User)
], Sell.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'agent_id' }),
    __metadata("design:type", user_entity_1.User)
], Sell.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'employee_maintain_id' }),
    __metadata("design:type", user_entity_1.User)
], Sell.prototype, "employeeMaintain", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", user_entity_1.User)
], Sell.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'uid_login' }),
    __metadata("design:type", user_entity_1.User)
], Sell.prototype, "userLogin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sell_detail_entity_1.SellDetail, detail => detail.sell),
    __metadata("design:type", Array)
], Sell.prototype, "details", void 0);
exports.Sell = Sell = __decorate([
    (0, typeorm_1.Entity)('gas_sell')
], Sell);
//# sourceMappingURL=sell.entity.js.map