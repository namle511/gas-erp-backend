import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { MaterialType } from '../../database/entities/material-type.entity';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';

interface FindAllParams {
    status?: number;
    search?: string;
    page?: number;
    limit?: number;
}

@Injectable()
export class MaterialTypesService {
    constructor(
        @InjectRepository(MaterialType)
        private materialTypeRepository: Repository<MaterialType>,
    ) { }

    async findAll(params: FindAllParams) {
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

    async findOne(id: number) {
        const materialType = await this.materialTypeRepository.findOne({
            where: { id },
        });

        if (!materialType) {
            throw new NotFoundException(`Loại vật tư với ID ${id} không tồn tại`);
        }

        return materialType;
    }

    async create(createDto: CreateMaterialTypeDto) {
        const materialType = this.materialTypeRepository.create({
            ...createDto,
            status: createDto.status ?? 1,
            groupType: createDto.groupType ?? 1,
        });

        return this.materialTypeRepository.save(materialType);
    }

    async update(id: number, updateDto: UpdateMaterialTypeDto) {
        const materialType = await this.findOne(id);
        Object.assign(materialType, updateDto);
        return this.materialTypeRepository.save(materialType);
    }

    async remove(id: number) {
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
}
