import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { User, UserRole, UserStatus, UserType } from '../../database/entities';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { HGD_TYPES } from '../../shared/constants';

// Khách hàng: role_id = 4
const CUSTOMER_ROLES = [4];

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(query?: {
        roleId?: number;
        type?: number;
        status?: number;
        provinceId?: number;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const where: any = {
            roleId: In(CUSTOMER_ROLES),
        };

        if (query?.roleId) {
            where.roleId = query.roleId;
        }

        if (query?.type !== undefined) {
            where.type = query.type;
        }

        if (query?.status !== undefined) {
            where.status = query.status;
        }

        if (query?.provinceId) {
            where.provinceId = query.provinceId;
        }

        const page = query?.page || 1;
        const limit = query?.limit || 20;

        let queryBuilder = this.userRepository.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.province', 'province')
            .leftJoinAndSelect('customer.district', 'district')
            .leftJoinAndSelect('customer.ward', 'ward')
            .leftJoinAndSelect('customer.street', 'street')
            .where(where);

        if (query?.search) {
            queryBuilder = queryBuilder.andWhere(
                '(customer.firstName LIKE :search OR customer.phone LIKE :search OR customer.address LIKE :search)',
                { search: `%${query.search}%` }
            );
        }

        const [customers, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('customer.id', 'DESC')
            .getManyAndCount();

        // Collect unique agent and sale IDs (areaCodeId is bigint, returns as string)
        const agentIds = [...new Set(customers.map(c => Number(c.areaCodeId)).filter(id => id > 0))];
        const saleIds = [...new Set(customers.map(c => Number(c.saleId)).filter(id => id > 0))];

        // Fetch agents and sales in batch
        let agentsMap: Map<number, any> = new Map();
        let salesMap: Map<number, any> = new Map();

        if (agentIds.length > 0) {
            const agents = await this.userRepository.find({
                where: { id: In(agentIds) },
                select: ['id', 'firstName', 'nameAgent'],
            });
            agents.forEach(a => agentsMap.set(a.id, { firstName: a.firstName, nameAgent: a.nameAgent }));
        }

        if (saleIds.length > 0) {
            const sales = await this.userRepository.find({
                where: { id: In(saleIds) },
                select: ['id', 'firstName'],
            });
            sales.forEach(s => salesMap.set(s.id, { firstName: s.firstName }));
        }

        // Merge data
        const customersWithRelations = customers.map(c => ({
            ...c,
            agent: Number(c.areaCodeId) > 0 ? agentsMap.get(Number(c.areaCodeId)) || null : null,
            sale: Number(c.saleId) > 0 ? salesMap.get(Number(c.saleId)) || null : null,
        }));

        return {
            data: customersWithRelations,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async searchHgd(query: {
        term?: string;
        customerType?: string; // comma separated list of isMaintain values
        agentId?: number;
        limit?: number;
    }) {
        const limit = query.limit || 20;

        // Determine which is_maintain values to filter
        let isMaintainValues: number[];
        if (query.customerType) {
            isMaintainValues = query.customerType.split(',').map(v => parseInt(v.trim()));
        } else {
            isMaintainValues = [...HGD_TYPES]; // Use imported constant
        }

        console.log('searchHgd params:', { term: query.term, isMaintainValues });

        let queryBuilder = this.userRepository.createQueryBuilder('customer')
            .where('customer.roleId = :roleId', { roleId: 4 }) // ROLE_CUSTOMER = 4
            .andWhere('customer.status = :status', { status: 1 }) // STATUS_ACTIVE
            .andWhere('customer.isMaintain IN (:...isMaintain)', { isMaintain: isMaintainValues });

        // Filter by agent if provided
        if (query.agentId) {
            queryBuilder = queryBuilder.andWhere('customer.areaCodeId = :agentId', { agentId: query.agentId });
        }

        // Search by address, phone, or name
        if (query.term) {
            queryBuilder = queryBuilder.andWhere(
                '(customer.address LIKE :term OR customer.addressVi LIKE :term OR customer.phone LIKE :term OR customer.firstName LIKE :term OR customer.lastName LIKE :term)',
                { term: `%${query.term}%` }
            );
        }

        console.log('searchHgd SQL:', queryBuilder.getSql());

        const customers = await queryBuilder
            .take(limit)
            .orderBy('customer.id', 'DESC')
            .getMany();

        console.log('searchHgd result count:', customers.length);

        // Format response similar to legacy
        return customers.map(c => ({
            id: c.id,
            firstName: c.firstName,
            lastName: c.lastName,
            phone: c.phone,
            address: c.address,
            username: c.username,
            isMaintain: c.isMaintain,
        }));
    }

    async findOne(id: number) {
        const customer = await this.userRepository.findOne({
            where: { id, roleId: In(CUSTOMER_ROLES) },
            relations: ['province', 'district', 'ward', 'street'],
        });

        if (!customer) {
            throw new NotFoundException(`Không tìm thấy khách hàng với ID ${id}`);
        }

        return customer;
    }

    async create(createCustomerDto: CreateCustomerDto, createdBy: number) {
        // Check phone unique nếu có
        if (createCustomerDto.phone) {
            const existingCustomer = await this.userRepository.findOne({
                where: { phone: Like(`%${createCustomerDto.phone}%`) },
            });

            if (existingCustomer) {
                throw new BadRequestException('Số điện thoại đã tồn tại trong hệ thống');
            }
        }

        const customer = this.userRepository.create({
            ...createCustomerDto,
            username: createCustomerDto.phone || `customer_${Date.now()}`,
            email: createCustomerDto.email || `${Date.now()}@gas.local`,
            passwordHash: '',
            roleId: createCustomerDto.roleId || UserRole.CUSTOMER,
        });

        return this.userRepository.save(customer);
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto) {
        const customer = await this.findOne(id);
        Object.assign(customer, updateCustomerDto);
        return this.userRepository.save(customer);
    }

    async remove(id: number) {
        const customer = await this.findOne(id);
        customer.status = UserStatus.INACTIVE;
        await this.userRepository.save(customer);
        return { message: 'Đã vô hiệu hóa khách hàng thành công' };
    }

    async getCustomerTypes() {
        return [
            { id: UserType.NORMAL, name: 'Thường' },
            { id: UserType.MAINTAIN, name: 'Bảo trì' },
            { id: UserType.PTTT, name: 'PTTT' },
            { id: UserType.STORE_CARD, name: 'Thẻ kho' },
        ];
    }
}
