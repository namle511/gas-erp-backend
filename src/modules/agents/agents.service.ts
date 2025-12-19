import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from '../../database/entities';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import * as bcrypt from 'bcrypt';

// Đại lý có role_id = 5
const AGENT_ROLE_ID = 5;

@Injectable()
export class AgentsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async findAll(query?: {
        status?: number;
        provinceId?: number;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const where: any = {
            roleId: AGENT_ROLE_ID,
        };

        if (query?.status !== undefined) {
            where.status = query.status;
        }

        if (query?.provinceId) {
            where.provinceId = query.provinceId;
        }

        const page = query?.page || 1;
        const limit = query?.limit || 20;

        let queryBuilder = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.province', 'province')
            .leftJoinAndSelect('user.district', 'district')
            .leftJoinAndSelect('user.ward', 'ward')
            .where(where);

        if (query?.search) {
            queryBuilder = queryBuilder.andWhere(
                '(user.firstName LIKE :search OR user.nameAgent LIKE :search OR user.phone LIKE :search OR user.codeBusiness LIKE :search OR user.addressVi LIKE :search)',
                { search: `%${query.search}%` }
            );
        }

        const [agents, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('user.id', 'DESC')
            .getManyAndCount();

        return {
            data: agents,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number) {
        const agent = await this.userRepository.findOne({
            where: { id, roleId: AGENT_ROLE_ID },
            relations: ['province', 'district', 'ward', 'street'],
        });

        if (!agent) {
            throw new NotFoundException(`Đại lý với ID ${id} không tồn tại`);
        }

        return agent;
    }

    async create(createAgentDto: CreateAgentDto, createdBy: number) {
        // Check username exists
        const existingUser = await this.userRepository.findOne({
            where: { username: createAgentDto.username },
        });
        if (existingUser) {
            throw new ConflictException('Tên đăng nhập đã tồn tại');
        }

        // Check email exists
        const existingEmail = await this.userRepository.findOne({
            where: { email: createAgentDto.email },
        });
        if (existingEmail) {
            throw new ConflictException('Email đã tồn tại');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(createAgentDto.password, 10);

        const agent = this.userRepository.create({
            ...createAgentDto,
            passwordHash: hashedPassword,
            roleId: AGENT_ROLE_ID,
            status: createAgentDto.status ?? 1,
            createdBy,
            createdDate: new Date(),
        });
        delete (agent as any).password;

        return this.userRepository.save(agent);
    }

    async update(id: number, updateAgentDto: UpdateAgentDto) {
        const agent = await this.findOne(id);

        // Check username if changed
        if (updateAgentDto.username && updateAgentDto.username !== agent.username) {
            const existingUser = await this.userRepository.findOne({
                where: { username: updateAgentDto.username },
            });
            if (existingUser) {
                throw new ConflictException('Tên đăng nhập đã tồn tại');
            }
        }

        // Check email if changed
        if (updateAgentDto.email && updateAgentDto.email !== agent.email) {
            const existingEmail = await this.userRepository.findOne({
                where: { email: updateAgentDto.email },
            });
            if (existingEmail) {
                throw new ConflictException('Email đã tồn tại');
            }
        }

        // Hash new password if provided
        if (updateAgentDto.password) {
            (agent as any).passwordHash = await bcrypt.hash(updateAgentDto.password, 10);
            delete updateAgentDto.password;
        }

        const { password, ...updateData } = updateAgentDto as any;
        Object.assign(agent, updateData);
        return this.userRepository.save(agent);
    }

    async remove(id: number) {
        const agent = await this.findOne(id);
        await this.userRepository.remove(agent);
        return { message: 'Đã xóa đại lý thành công' };
    }
}
