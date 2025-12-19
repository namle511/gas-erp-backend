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
exports.StreetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let StreetsService = class StreetsService {
    streetRepository;
    constructor(streetRepository) {
        this.streetRepository = streetRepository;
    }
    async findAll(query) {
        const where = {};
        if (query?.provinceId) {
            where.provinceId = query.provinceId;
        }
        if (query?.status !== undefined) {
            where.status = query.status;
        }
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        let queryBuilder = this.streetRepository.createQueryBuilder('street')
            .where(where);
        if (query?.search) {
            queryBuilder = queryBuilder.andWhere('(street.name LIKE :search OR street.nameVi LIKE :search)', { search: `%${query.search}%` });
        }
        const [streets, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('street.id', 'DESC')
            .getManyAndCount();
        return {
            data: streets,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const street = await this.streetRepository.findOne({
            where: { id },
            relations: ['province'],
        });
        if (!street) {
            throw new common_1.NotFoundException(`Không tìm thấy đường với ID ${id}`);
        }
        return street;
    }
    async create(createStreetDto, userId) {
        const street = this.streetRepository.create({
            ...createStreetDto,
            nameVi: this.generateNameVi(createStreetDto.name),
            userIdCreate: userId,
        });
        return this.streetRepository.save(street);
    }
    async update(id, updateStreetDto) {
        const street = await this.findOne(id);
        const updateData = { ...updateStreetDto };
        if ('name' in updateStreetDto && updateStreetDto.name) {
            updateData.nameVi = this.generateNameVi(updateStreetDto.name);
        }
        Object.assign(street, updateData);
        return this.streetRepository.save(street);
    }
    async remove(id) {
        const street = await this.findOne(id);
        await this.streetRepository.remove(street);
        return { message: 'Đã xóa đường thành công' };
    }
    async search(keyword) {
        if (!keyword || keyword.length < 2) {
            return [];
        }
        return this.streetRepository.find({
            where: {
                nameVi: (0, typeorm_2.Like)(`%${keyword.toLowerCase()}%`),
                status: 1,
            },
            select: ['id', 'name'],
            take: 10,
        });
    }
    async findByProvince(provinceId) {
        return this.streetRepository.find({
            where: { provinceId, status: 1 },
            select: ['id', 'name'],
            order: { name: 'ASC' },
        });
    }
    generateNameVi(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd');
    }
};
exports.StreetsService = StreetsService;
exports.StreetsService = StreetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Street)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StreetsService);
//# sourceMappingURL=streets.service.js.map