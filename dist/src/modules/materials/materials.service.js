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
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let MaterialsService = class MaterialsService {
    materialRepository;
    materialTypeRepository;
    constructor(materialRepository, materialTypeRepository) {
        this.materialRepository = materialRepository;
        this.materialTypeRepository = materialTypeRepository;
    }
    async findAll(query) {
        const where = {};
        if (query?.materialsTypeId) {
            where.materialsTypeId = query.materialsTypeId;
        }
        if (query?.status !== undefined) {
            where.status = query.status;
        }
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        let queryBuilder = this.materialRepository.createQueryBuilder('material')
            .leftJoinAndSelect('material.materialType', 'materialType')
            .where(where);
        if (query?.search) {
            queryBuilder = queryBuilder.andWhere('(material.name LIKE :search OR material.materialsNo LIKE :search OR material.nameVi LIKE :search)', { search: `%${query.search}%` });
        }
        const [materials, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('material.id', 'DESC')
            .getManyAndCount();
        return {
            data: materials,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const material = await this.materialRepository.findOne({
            where: { id },
            relations: ['materialType'],
        });
        if (!material) {
            throw new common_1.NotFoundException(`Không tìm thấy vật tư với ID ${id}`);
        }
        return material;
    }
    async create(createMaterialDto, createdBy) {
        const material = this.materialRepository.create({
            ...createMaterialDto,
            nameVi: this.generateNameVi(createMaterialDto.name),
            createdBy,
            createdDateBigint: Math.floor(Date.now() / 1000),
        });
        return this.materialRepository.save(material);
    }
    async update(id, updateMaterialDto) {
        const material = await this.findOne(id);
        const updateData = { ...updateMaterialDto };
        if ('name' in updateMaterialDto && updateMaterialDto.name) {
            updateData.nameVi = this.generateNameVi(updateMaterialDto.name);
        }
        Object.assign(material, updateData);
        return this.materialRepository.save(material);
    }
    async remove(id) {
        const material = await this.findOne(id);
        material.status = 0;
        await this.materialRepository.save(material);
        return { message: 'Đã vô hiệu hóa vật tư thành công' };
    }
    async getMaterialTypes() {
        return this.materialTypeRepository.find({
            where: { status: 1 },
            order: { name: 'ASC' },
        });
    }
    async getDropdownList() {
        return this.materialRepository.find({
            where: { status: 1 },
            select: ['id', 'name', 'materialsNo', 'price'],
            order: { displayOrder: 'ASC', name: 'ASC' },
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
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Material)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.MaterialType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map