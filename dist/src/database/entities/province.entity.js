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
exports.Province = void 0;
const typeorm_1 = require("typeorm");
const district_entity_1 = require("./district.entity");
let Province = class Province {
    id;
    name;
    shortName;
    status;
    slug;
    displayOrder;
    districts;
};
exports.Province = Province;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'smallint', unsigned: true }),
    __metadata("design:type", Number)
], Province.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, name: 'short_name', nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], Province.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', unsigned: true, name: 'display_order', default: 50 }),
    __metadata("design:type", Number)
], Province.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => district_entity_1.District, (district) => district.province),
    __metadata("design:type", Array)
], Province.prototype, "districts", void 0);
exports.Province = Province = __decorate([
    (0, typeorm_1.Entity)('gas_gas_province')
], Province);
//# sourceMappingURL=province.entity.js.map