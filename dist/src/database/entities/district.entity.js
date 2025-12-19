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
exports.District = void 0;
const typeorm_1 = require("typeorm");
const province_entity_1 = require("./province.entity");
const ward_entity_1 = require("./ward.entity");
let District = class District {
    id;
    provinceId;
    name;
    shortName;
    status;
    userIdCreate;
    province;
    wards;
};
exports.District = District;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], District.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'province_id' }),
    __metadata("design:type", Number)
], District.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], District.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'short_name', nullable: true }),
    __metadata("design:type", String)
], District.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], District.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'user_id_create', nullable: true }),
    __metadata("design:type", Number)
], District.prototype, "userIdCreate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province, (province) => province.districts),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", province_entity_1.Province)
], District.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ward_entity_1.Ward, (ward) => ward.district),
    __metadata("design:type", Array)
], District.prototype, "wards", void 0);
exports.District = District = __decorate([
    (0, typeorm_1.Entity)('gas_gas_district')
], District);
//# sourceMappingURL=district.entity.js.map