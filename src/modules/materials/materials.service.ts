import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Material, MaterialType } from '../../database/entities';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
    constructor(
        @InjectRepository(Material)
        private readonly materialRepository: Repository<Material>,
        @InjectRepository(MaterialType)
        private readonly materialTypeRepository: Repository<MaterialType>,
    ) { }

    async findAll(query?: {
        materialsTypeId?: number;
        status?: number;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const where: any = {};

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
            queryBuilder = queryBuilder.andWhere(
                '(material.name LIKE :search OR material.materialsNo LIKE :search OR material.nameVi LIKE :search)',
                { search: `%${query.search}%` }
            );
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

    async findOne(id: number) {
        const material = await this.materialRepository.findOne({
            where: { id },
            relations: ['materialType'],
        });

        if (!material) {
            throw new NotFoundException(`Không tìm thấy vật tư với ID ${id}`);
        }

        return material;
    }

    async create(createMaterialDto: CreateMaterialDto, createdBy: number) {
        const material = this.materialRepository.create({
            ...createMaterialDto,
            nameVi: this.generateNameVi(createMaterialDto.name),
            createdBy,
            createdDateBigint: Math.floor(Date.now() / 1000),
        });
        return this.materialRepository.save(material);
    }

    async update(id: number, updateMaterialDto: UpdateMaterialDto) {
        const material = await this.findOne(id);

        const updateData: any = { ...updateMaterialDto };
        if ('name' in updateMaterialDto && updateMaterialDto.name) {
            updateData.nameVi = this.generateNameVi(updateMaterialDto.name);
        }

        Object.assign(material, updateData);
        return this.materialRepository.save(material);
    }

    async remove(id: number) {
        const material = await this.findOne(id);
        material.status = 0;
        await this.materialRepository.save(material);
        return { message: 'Đã vô hiệu hóa vật tư thành công' };
    }

    // Material Types
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

    private generateNameVi(name: string): string {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd');
    }
}
