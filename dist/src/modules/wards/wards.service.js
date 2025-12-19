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
exports.WardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let WardsService = class WardsService {
    wardRepository;
    constructor(wardRepository) {
        this.wardRepository = wardRepository;
    }
    async findAll(query) {
        const where = {};
        if (query?.provinceId) {
            where.provinceId = query.provinceId;
        }
        if (query?.districtId) {
            where.districtId = query.districtId;
        }
        if (query?.status !== undefined) {
            where.status = query.status;
        }
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        let queryBuilder = this.wardRepository.createQueryBuilder('ward')
            .leftJoinAndSelect('ward.province', 'province')
            .leftJoinAndSelect('ward.district', 'district')
            .where(where);
        if (query?.search) {
            queryBuilder = queryBuilder.andWhere('ward.name LIKE :search', { search: `%${query.search}%` });
        }
        const [wards, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('ward.id', 'DESC')
            .getManyAndCount();
        return {
            data: wards,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const ward = await this.wardRepository.findOne({
            where: { id },
            relations: ['province', 'district'],
        });
        if (!ward) {
            throw new common_1.NotFoundException(`Không tìm thấy phường/xã với ID ${id}`);
        }
        return ward;
    }
    async create(createWardDto, userId) {
        const ward = this.wardRepository.create({
            ...createWardDto,
            nameVi: this.generateNameVi(createWardDto.name),
            userIdCreate: userId,
        });
        return this.wardRepository.save(ward);
    }
    async update(id, updateWardDto) {
        const ward = await this.findOne(id);
        const updateData = { ...updateWardDto };
        if ('name' in updateWardDto && updateWardDto.name) {
            updateData.nameVi = this.generateNameVi(updateWardDto.name);
        }
        Object.assign(ward, updateData);
        return this.wardRepository.save(ward);
    }
    async remove(id) {
        const ward = await this.findOne(id);
        await this.wardRepository.remove(ward);
        return { message: 'Đã xóa phường/xã thành công' };
    }
    async getByDistrict(districtId) {
        return this.wardRepository.find({
            where: { districtId, status: 1 },
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
exports.WardsService = WardsService;
exports.WardsService = WardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Ward)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WardsService);
//# sourceMappingURL=wards.service.js.map