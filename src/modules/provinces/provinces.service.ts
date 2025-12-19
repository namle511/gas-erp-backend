import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Province } from '../../database/entities';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
    constructor(
        @InjectRepository(Province)
        private readonly provinceRepository: Repository<Province>,
    ) { }

    async findAll(query?: { status?: number; search?: string }) {
        const where: any = {};

        if (query?.status !== undefined) {
            where.status = query.status;
        }

        if (query?.search) {
            where.name = Like(`%${query.search}%`);
        }

        const provinces = await this.provinceRepository.find({
            where,
            order: { displayOrder: 'ASC', name: 'ASC' },
        });

        return provinces;
    }

    async findOne(id: number) {
        const province = await this.provinceRepository.findOne({
            where: { id },
            relations: ['districts'],
        });

        if (!province) {
            throw new NotFoundException(`Không tìm thấy tỉnh/thành phố với ID ${id}`);
        }

        return province;
    }

    async create(createProvinceDto: CreateProvinceDto) {
        const province = this.provinceRepository.create({
            ...createProvinceDto,
            slug: this.generateSlug(createProvinceDto.name),
        });
        return this.provinceRepository.save(province);
    }

    async update(id: number, updateProvinceDto: UpdateProvinceDto) {
        const province = await this.findOne(id);

        const updateData: any = { ...updateProvinceDto };
        if ('name' in updateProvinceDto && updateProvinceDto.name) {
            updateData.slug = this.generateSlug(updateProvinceDto.name);
        }

        Object.assign(province, updateData);
        return this.provinceRepository.save(province);
    }

    async remove(id: number) {
        const province = await this.findOne(id);
        await this.provinceRepository.remove(province);
        return { message: 'Đã xóa tỉnh/thành phố thành công' };
    }

    async getDropdownList() {
        return this.provinceRepository.find({
            where: { status: 1 },
            select: ['id', 'name'],
            order: { displayOrder: 'ASC', name: 'ASC' },
        });
    }

    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
}
