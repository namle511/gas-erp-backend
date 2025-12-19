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
exports.Ward = void 0;
const typeorm_1 = require("typeorm");
const province_entity_1 = require("./province.entity");
const district_entity_1 = require("./district.entity");
let Ward = class Ward {
    id;
    provinceId;
    districtId;
    name;
    nameVi;
    slug;
    status;
    userIdCreate;
    province;
    district;
};
exports.Ward = Ward;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Ward.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'province_id' }),
    __metadata("design:type", Number)
], Ward.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'district_id' }),
    __metadata("design:type", Number)
], Ward.prototype, "districtId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Ward.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, name: 'name_vi', nullable: true }),
    __metadata("design:type", String)
], Ward.prototype, "nameVi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Ward.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], Ward.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'user_id_create', nullable: true }),
    __metadata("design:type", Number)
], Ward.prototype, "userIdCreate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", province_entity_1.Province)
], Ward.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.District, (district) => district.wards),
    (0, typeorm_1.JoinColumn)({ name: 'district_id' }),
    __metadata("design:type", district_entity_1.District)
], Ward.prototype, "district", void 0);
exports.Ward = Ward = __decorate([
    (0, typeorm_1.Entity)('gas_gas_ward')
], Ward);
//# sourceMappingURL=ward.entity.js.map