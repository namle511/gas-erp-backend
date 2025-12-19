import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { District } from '../../database/entities';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictsService {
    constructor(
        @InjectRepository(District)
        private readonly districtRepository: Repository<District>,
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

    async findOne(id: number) {
        const district = await this.districtRepository.findOne({
            where: { id },
            relations: ['province', 'wards'],
        });

        if (!district) {
            throw new NotFoundException(`Không tìm thấy quận/huyện với ID ${id}`);
        }

        return district;
    }

    async create(createDistrictDto: CreateDistrictDto, userId: number) {
        const district = this.districtRepository.create({
            ...createDistrictDto,
            shortName: this.generateShortName(createDistrictDto.name),
            userIdCreate: userId,
        });
        return this.districtRepository.save(district);
    }

    async update(id: number, updateDistrictDto: UpdateDistrictDto) {
        const district = await this.findOne(id);

        const updateData: any = { ...updateDistrictDto };
        if ('name' in updateDistrictDto && updateDistrictDto.name) {
            updateData.shortName = this.generateShortName(updateDistrictDto.name);
        }

        Object.assign(district, updateData);
        return this.districtRepository.save(district);
    }

    async remove(id: number) {
        const district = await this.findOne(id);
        await this.districtRepository.remove(district);
        return { message: 'Đã xóa quận/huyện thành công' };
    }

    async getByProvince(provinceId: number) {
        return this.districtRepository.find({
            where: { provinceId, status: 1 },
            select: ['id', 'name'],
            order: { name: 'ASC' },
        });
    }

    private generateShortName(name: string): string {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd');
    }
}
