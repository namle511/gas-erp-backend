import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Street } from '../../database/entities';
import { CreateStreetDto } from './dto/create-street.dto';
import { UpdateStreetDto } from './dto/update-street.dto';

@Injectable()
export class StreetsService {
    constructor(
        @InjectRepository(Street)
        private readonly streetRepository: Repository<Street>,
    ) { }

    async findAll(query?: { provinceId?: number; status?: number; search?: string; page?: number; limit?: number }) {
        const where: any = {};

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

    async findOne(id: number) {
        const street = await this.streetRepository.findOne({
            where: { id },
            relations: ['province'],
        });

        if (!street) {
            throw new NotFoundException(`Không tìm thấy đường với ID ${id}`);
        }

        return street;
    }

    async create(createStreetDto: CreateStreetDto, userId: number) {
        const street = this.streetRepository.create({
            ...createStreetDto,
            nameVi: this.generateNameVi(createStreetDto.name),
            userIdCreate: userId,
        });
        return this.streetRepository.save(street);
    }

    async update(id: number, updateStreetDto: UpdateStreetDto) {
        const street = await this.findOne(id);

        const updateData: any = { ...updateStreetDto };
        if ('name' in updateStreetDto && updateStreetDto.name) {
            updateData.nameVi = this.generateNameVi(updateStreetDto.name);
        }

        Object.assign(street, updateData);
        return this.streetRepository.save(street);
    }

    async remove(id: number) {
        const street = await this.findOne(id);
        await this.streetRepository.remove(street);
        return { message: 'Đã xóa đường thành công' };
    }

    async search(keyword: string) {
        if (!keyword || keyword.length < 2) {
            return [];
        }

        return this.streetRepository.find({
            where: {
                nameVi: Like(`%${keyword.toLowerCase()}%`),
                status: 1,
            },
            select: ['id', 'name'],
            take: 10,
        });
    }

    async findByProvince(provinceId: number) {
        return this.streetRepository.find({
            where: { provinceId, status: 1 },
            select: ['id', 'name'],
            order: { name: 'ASC' },
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
