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
exports.MaterialTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const material_type_entity_1 = require("../../database/entities/material-type.entity");
let MaterialTypesService = class MaterialTypesService {
    materialTypeRepository;
    constructor(materialTypeRepository) {
        this.materialTypeRepository = materialTypeRepository;
    }
    async findAll(params) {
        const { status, search, page = 1, limit = 20 } = params;
        const queryBuilder = this.materialTypeRepository.createQueryBuilder('mt');
        if (status !== undefined) {
            queryBuilder.andWhere('mt.status = :status', { status });
        }
        if (search) {
            queryBuilder.andWhere('mt.name LIKE :search', { search: `%${search}%` });
        }
        queryBuilder.orderBy('mt.id', 'DESC');
        const total = await queryBuilder.getCount();
        const data = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const materialType = await this.materialTypeRepository.findOne({
            where: { id },
        });
        if (!materialType) {
            throw new common_1.NotFoundException(`Loại vật tư với ID ${id} không tồn tại`);
        }
        return materialType;
    }
    async create(createDto) {
        const materialType = this.materialTypeRepository.create({
            ...createDto,
            status: createDto.status ?? 1,
            groupType: createDto.groupType ?? 1,
        });
        return this.materialTypeRepository.save(materialType);
    }
    async update(id, updateDto) {
        const materialType = await this.findOne(id);
        Object.assign(materialType, updateDto);
        return this.materialTypeRepository.save(materialType);
    }
    async remove(id) {
        const materialType = await this.findOne(id);
        await this.materialTypeRepository.remove(materialType);
        return { message: 'Đã xóa loại vật tư thành công' };
    }
    async getDropdownList() {
        return this.materialTypeRepository.find({
            where: { status: 1 },
            select: ['id', 'name'],
            order: { name: 'ASC' },
        });
    }
};
exports.MaterialTypesService = MaterialTypesService;
exports.MaterialTypesService = MaterialTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(material_type_entity_1.MaterialType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MaterialTypesService);
//# sourceMappingURL=material-types.service.js.map