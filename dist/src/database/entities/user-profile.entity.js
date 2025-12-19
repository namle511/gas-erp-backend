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
exports.UserProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserProfile = class UserProfile {
    id;
    userId;
    user;
    type;
    parentId;
    countryId;
    typeNation;
    typeReligion;
    typeEducation;
    idNumber;
    idProvince;
    idCreatedDate;
    statusMarital;
    dateBeginJob;
    contractType;
    contractBegin;
    contractEnd;
    positionWork;
    positionRoom;
    leaveDate;
    baseSalary;
    bankId;
    bankNo;
    bankBranch;
    socialInsuranceNo;
    taxNo;
    salaryMethod;
    addressHomeProvince;
    addressLiveProvince;
    json;
    updateBy;
    updateTime;
};
exports.UserProfile = UserProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'user_id' }),
    __metadata("design:type", Number)
], UserProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.profile),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserProfile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1, nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'parent_id', default: 0, nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'country_id', default: 1, nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'type_nation', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "typeNation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'type_religion', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "typeReligion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'type_education', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "typeEducation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'id_number', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "idNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'id_province', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "idProvince", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'id_created_date', nullable: true }),
    __metadata("design:type", Date)
], UserProfile.prototype, "idCreatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'status_marital', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "statusMarital", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'date_begin_job', nullable: true }),
    __metadata("design:type", Date)
], UserProfile.prototype, "dateBeginJob", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'contract_type', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'contract_begin', nullable: true }),
    __metadata("design:type", Date)
], UserProfile.prototype, "contractBegin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'contract_end', nullable: true }),
    __metadata("design:type", Date)
], UserProfile.prototype, "contractEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'position_work', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "positionWork", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'position_room', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "positionRoom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'leave_date', nullable: true }),
    __metadata("design:type", Date)
], UserProfile.prototype, "leaveDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, name: 'base_salary', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "baseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'bank_id', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "bankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, name: 'bank_no', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "bankNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'bank_branch', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "bankBranch", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'social_insurance_no', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "socialInsuranceNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'tax_no', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "taxNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'salary_method', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "salaryMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'address_home_province', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "addressHomeProvince", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'address_live_province', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "addressLiveProvince", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "json", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'update_by', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "updateBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'update_time', nullable: true }),
    __metadata("design:type", Date)
], UserProfile.prototype, "updateTime", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, typeorm_1.Entity)('gas_users_profile')
], UserProfile);
//# sourceMappingURL=user-profile.entity.js.map