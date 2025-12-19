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
exports.DistrictsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let DistrictsService = class DistrictsService {
    districtRepository;
    constructor(districtRepository) {
        this.districtRepository = districtRepository;
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
        let queryBuilder = this.districtRepository.createQueryBuilder('district')
            .leftJoinAndSelect('district.province', 'province')
            .where(where);
        if (query?.search) {
            queryBuilder = queryBuilder.andWhere('district.name LIKE :search', { search: `%${query.search}%` });
        }
        const [districts, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('district.id', 'DESC')
            .getManyAndCount();
        return {
            data: districts,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const district = await this.districtRepository.findOne({
            where: { id },
            relations: ['province', 'wards'],
        });
        if (!district) {
            throw new common_1.NotFoundException(`Không tìm thấy quận/huyện với ID ${id}`);
        }
        return district;
    }
    async create(createDistrictDto, userId) {
        const district = this.districtRepository.create({
            ...createDistrictDto,
            shortName: this.generateShortName(createDistrictDto.name),
            userIdCreate: userId,
        });
        return this.districtRepository.save(district);
    }
    async update(id, updateDistrictDto) {
        const district = await this.findOne(id);
        const updateData = { ...updateDistrictDto };
        if ('name' in updateDistrictDto && updateDistrictDto.name) {
            updateData.shortName = this.generateShortName(updateDistrictDto.name);
        }
        Object.assign(district, updateData);
        return this.districtRepository.save(district);
    }
    async remove(id) {
        const district = await this.findOne(id);
        await this.districtRepository.remove(district);
        return { message: 'Đã xóa quận/huyện thành công' };
    }
    async getByProvince(provinceId) {
        return this.districtRepository.find({
            where: { provinceId, status: 1 },
            select: ['id', 'name'],
            order: { name: 'ASC' },
        });
    }
    generateShortName(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd');
    }
};
exports.DistrictsService = DistrictsService;
exports.DistrictsService = DistrictsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.District)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DistrictsService);
//# sourceMappingURL=districts.service.js.map