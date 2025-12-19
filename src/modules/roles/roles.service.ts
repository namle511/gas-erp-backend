import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Role } from '../../database/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async findAll(query?: {
        status?: number;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const where: any = {};

        if (query?.status !== undefined) {
            where.status = query.status;
        }

        const page = query?.page || 1;
        const limit = query?.limit || 50;

        let queryBuilder = this.roleRepository.createQueryBuilder('role')
            .where(where);

        if (query?.search) {
            queryBuilder = queryBuilder.andWhere(
                '(role.roleName LIKE :search OR role.roleShortName LIKE :search)',
                { search: `%${query.search}%` }
            );
        }

        const [roles, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('role.id', 'ASC')
            .getManyAndCount();

        return {
            data: roles,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number) {
        const role = await this.roleRepository.findOne({
            where: { id },
        });

        if (!role) {
            throw new NotFoundException(`Không tìm thấy vai trò với ID ${id}`);
        }

        return role;
    }

    async create(createRoleDto: CreateRoleDto) {
        // Check if role name exists
        const existingRole = await this.roleRepository.findOne({
            where: { roleName: createRoleDto.roleName },
        });

        if (existingRole) {
            throw new BadRequestException('Tên vai trò đã tồn tại');
        }

        const role = this.roleRepository.create({
            ...createRoleDto,
            status: createRoleDto.status ?? 1,
            applicationId: createRoleDto.applicationId ?? 1,
        });

        return this.roleRepository.save(role);
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        const role = await this.findOne(id);
        Object.assign(role, updateRoleDto);
        return this.roleRepository.save(role);
    }

    async remove(id: number) {
        const role = await this.findOne(id);
        role.status = 0;
        await this.roleRepository.save(role);
        return { message: 'Đã vô hiệu hóa vai trò thành công' };
    }
}
