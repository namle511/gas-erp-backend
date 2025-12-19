import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Ward } from '../../database/entities';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';

@Injectable()
export class WardsService {
    constructor(
        @InjectRepository(Ward)
        private readonly wardRepository: Repository<Ward>,
    ) { }

    async findAll(query?: { provinceId?: number; districtId?: number; status?: number; search?: string; page?: number; limit?: number }) {
        const where: any = {};

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

    async findOne(id: number) {
        const ward = await this.wardRepository.findOne({
            where: { id },
            relations: ['province', 'district'],
        });

        if (!ward) {
            throw new NotFoundException(`Không tìm thấy phường/xã với ID ${id}`);
        }

        return ward;
    }

    async create(createWardDto: CreateWardDto, userId: number) {
        const ward = this.wardRepository.create({
            ...createWardDto,
            nameVi: this.generateNameVi(createWardDto.name),
            userIdCreate: userId,
        });
        return this.wardRepository.save(ward);
    }

    async update(id: number, updateWardDto: UpdateWardDto) {
        const ward = await this.findOne(id);

        const updateData: any = { ...updateWardDto };
        if ('name' in updateWardDto && updateWardDto.name) {
            updateData.nameVi = this.generateNameVi(updateWardDto.name);
        }

        Object.assign(ward, updateData);
        return this.wardRepository.save(ward);
    }

    async remove(id: number) {
        const ward = await this.findOne(id);
        await this.wardRepository.remove(ward);
        return { message: 'Đã xóa phường/xã thành công' };
    }

    async getByDistrict(districtId: number) {
        return this.wardRepository.find({
            where: { districtId, status: 1 },
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
