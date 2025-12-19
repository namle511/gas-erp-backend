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
exports.Street = void 0;
const typeorm_1 = require("typeorm");
const province_entity_1 = require("./province.entity");
let Street = class Street {
    id;
    provinceId;
    name;
    nameVi;
    slug;
    status;
    userIdCreate;
    province;
};
exports.Street = Street;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Street.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'province_id', nullable: true }),
    __metadata("design:type", Number)
], Street.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Street.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, name: 'name_vi', nullable: true }),
    __metadata("design:type", String)
], Street.prototype, "nameVi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Street.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], Street.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true, name: 'user_id_create', nullable: true }),
    __metadata("design:type", Number)
], Street.prototype, "userIdCreate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", province_entity_1.Province)
], Street.prototype, "province", void 0);
exports.Street = Street = __decorate([
    (0, typeorm_1.Entity)('gas_gas_street')
], Street);
//# sourceMappingURL=street.entity.js.map