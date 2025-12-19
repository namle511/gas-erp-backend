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
exports.User = exports.UserType = exports.UserStatus = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const province_entity_1 = require("./province.entity");
const district_entity_1 = require("./district.entity");
const ward_entity_1 = require("./ward.entity");
const street_entity_1 = require("./street.entity");
const user_profile_entity_1 = require("./user-profile.entity");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 1] = "ADMIN";
    UserRole[UserRole["HR"] = 2] = "HR";
    UserRole[UserRole["ACCOUNTANT"] = 3] = "ACCOUNTANT";
    UserRole[UserRole["SALE"] = 4] = "SALE";
    UserRole[UserRole["AGENT"] = 5] = "AGENT";
    UserRole[UserRole["CUSTOMER"] = 6] = "CUSTOMER";
    UserRole[UserRole["WAREHOUSE"] = 7] = "WAREHOUSE";
    UserRole[UserRole["MAINTAIN"] = 8] = "MAINTAIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["INACTIVE"] = 0] = "INACTIVE";
    UserStatus[UserStatus["ACTIVE"] = 1] = "ACTIVE";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var UserType;
(function (UserType) {
    UserType[UserType["NORMAL"] = 0] = "NORMAL";
    UserType[UserType["MAINTAIN"] = 1] = "MAINTAIN";
    UserType[UserType["PTTT"] = 2] = "PTTT";
    UserType[UserType["STORE_CARD"] = 3] = "STORE_CARD";
})(UserType || (exports.UserType = UserType = {}));
let User = class User {
    id;
    username;
    email;
    passwordHash;
    tempPassword;
    firstName;
    lastName;
    nameAgent;
    codeAccount;
    codeBusiness;
    address;
    addressVi;
    houseNumbers;
    provinceId;
    channelId;
    districtId;
    wardId;
    streetId;
    storehouseId;
    saleId;
    paymentDay;
    beginning;
    firstChar;
    loginAttempt;
    createdDate;
    createdDateBigint;
    lastLoggedIn;
    ipAddress;
    roleId;
    applicationId;
    status;
    gender;
    phone;
    verifyCode;
    areaCodeId;
    parentId;
    slug;
    isMaintain;
    type;
    addressTemp;
    lastPurchase;
    createdBy;
    price;
    priceOther;
    flagFixUpdate;
    province;
    district;
    ward;
    street;
    profile;
    getFullName() {
        return `${this.firstName || ''} ${this.lastName || ''}`.trim();
    }
    isAdmin() {
        return this.roleId === UserRole.ADMIN;
    }
    isAgent() {
        return this.roleId === UserRole.AGENT;
    }
    isCustomer() {
        return this.roleId === UserRole.CUSTOMER;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'password_hash' }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'temp_password', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "tempPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'first_name', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'last_name', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, name: 'name_agent', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "nameAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, name: 'code_account', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "codeAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, name: 'code_bussiness', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "codeBusiness", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'address_vi', default: '' }),
    __metadata("design:type", String)
], User.prototype, "addressVi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', name: 'house_numbers', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "houseNumbers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'province_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'channel_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'district_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "districtId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'ward_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumint', unsigned: true, name: 'street_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "streetId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'storehouse_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "storehouseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'sale_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "saleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', unsigned: true, name: 'payment_day', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "paymentDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "beginning", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'first_char', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "firstChar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'login_attemp', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "loginAttempt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'created_date_bigint', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "createdDateBigint", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'last_logged_in', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLoggedIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, name: 'ip_address', default: '' }),
    __metadata("design:type", String)
], User.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'role_id' }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'application_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: UserStatus.ACTIVE }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 6, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'verify_code', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "verifyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'area_code_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "areaCodeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'parent_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinytext', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'is_maintain', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "isMaintain", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'address_temp', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "addressTemp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'last_purchase', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastPurchase", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'created_by', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'price_other', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "priceOther", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'flag_fix_update', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "flagFixUpdate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", province_entity_1.Province)
], User.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.District, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'district_id' }),
    __metadata("design:type", district_entity_1.District)
], User.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ward_entity_1.Ward, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'ward_id' }),
    __metadata("design:type", ward_entity_1.Ward)
], User.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => street_entity_1.Street, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'street_id' }),
    __metadata("design:type", street_entity_1.Street)
], User.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_profile_entity_1.UserProfile, profile => profile.user),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], User.prototype, "profile", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('gas_users')
], User);
//# sourceMappingURL=user.entity.js.map