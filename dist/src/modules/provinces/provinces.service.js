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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvincesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let ProvincesService = class ProvincesService {
    provinceRepository;
    constructor(provinceRepository) {
        this.provinceRepository = provinceRepository;
    }
    async findAll(query) {
        const where = {};
        if (query?.status !== undefined) {
            where.status = query.status;
        }
        if (query?.search) {
            where.name = (0, typeorm_2.Like)(`%${query.search}%`);
        }
        const provinces = await this.provinceRepository.find({
            where,
            order: { displayOrder: 'ASC', name: 'ASC' },
        });
        return provinces;
    }
    async findOne(id) {
        const province = await this.provinceRepository.findOne({
            where: { id },
            relations: ['districts'],
        });
        if (!province) {
            throw new common_1.NotFoundException(`Không tìm thấy tỉnh/thành phố với ID ${id}`);
        }
        return province;
    }
    async create(createProvinceDto) {
        const province = this.provinceRepository.create({
            ...createProvinceDto,
            slug: this.generateSlug(createProvinceDto.name),
        });
        return this.provinceRepository.save(province);
    }
    async update(id, updateProvinceDto) {
        const province = await this.findOne(id);
        const updateData = { ...updateProvinceDto };
        if ('name' in updateProvinceDto && updateProvinceDto.name) {
            updateData.slug = this.generateSlug(updateProvinceDto.name);
        }
        Object.assign(province, updateData);
        return this.provinceRepository.save(province);
    }
    async remove(id) {
        const province = await this.findOne(id);
        await this.provinceRepository.remove(province);
        return { message: 'Đã xóa tỉnh/thành phố thành công' };
    }
    async getDropdownList() {
        return this.provinceRepository.find({
            where: { status: 1 },
            select: ['id', 'name'],
            order: { displayOrder: 'ASC', name: 'ASC' },
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
};
exports.ProvincesService = ProvincesService;
exports.ProvincesService = ProvincesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Province)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProvincesService);
//# sourceMappingURL=provinces.service.js.map