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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
const constants_1 = require("../../shared/constants");
const CUSTOMER_ROLES = [4];
let CustomersService = class CustomersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(query) {
        const where = {
            roleId: (0, typeorm_2.In)(CUSTOMER_ROLES),
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
            queryBuilder = queryBuilder.andWhere('(customer.firstName LIKE :search OR customer.phone LIKE :search OR customer.address LIKE :search)', { search: `%${query.search}%` });
        }
        const [customers, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('customer.id', 'DESC')
            .getManyAndCount();
        const agentIds = [...new Set(customers.map(c => Number(c.areaCodeId)).filter(id => id > 0))];
        const saleIds = [...new Set(customers.map(c => Number(c.saleId)).filter(id => id > 0))];
        let agentsMap = new Map();
        let salesMap = new Map();
        if (agentIds.length > 0) {
            const agents = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(agentIds) },
                select: ['id', 'firstName', 'nameAgent'],
            });
            agents.forEach(a => agentsMap.set(a.id, { firstName: a.firstName, nameAgent: a.nameAgent }));
        }
        if (saleIds.length > 0) {
            const sales = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(saleIds) },
                select: ['id', 'firstName'],
            });
            sales.forEach(s => salesMap.set(s.id, { firstName: s.firstName }));
        }
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
    async searchHgd(query) {
        const limit = query.limit || 20;
        let isMaintainValues;
        if (query.customerType) {
            isMaintainValues = query.customerType.split(',').map(v => parseInt(v.trim()));
        }
        else {
            isMaintainValues = [...constants_1.HGD_TYPES];
        }
        console.log('searchHgd params:', { term: query.term, isMaintainValues });
        let queryBuilder = this.userRepository.createQueryBuilder('customer')
            .where('customer.roleId = :roleId', { roleId: 4 })
            .andWhere('customer.status = :status', { status: 1 })
            .andWhere('customer.isMaintain IN (:...isMaintain)', { isMaintain: isMaintainValues });
        if (query.agentId) {
            queryBuilder = queryBuilder.andWhere('customer.areaCodeId = :agentId', { agentId: query.agentId });
        }
        if (query.term) {
            queryBuilder = queryBuilder.andWhere('(customer.address LIKE :term OR customer.addressVi LIKE :term OR customer.phone LIKE :term OR customer.firstName LIKE :term OR customer.lastName LIKE :term)', { term: `%${query.term}%` });
        }
        console.log('searchHgd SQL:', queryBuilder.getSql());
        const customers = await queryBuilder
            .take(limit)
            .orderBy('customer.id', 'DESC')
            .getMany();
        console.log('searchHgd result count:', customers.length);
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
    async findOne(id) {
        const customer = await this.userRepository.findOne({
            where: { id, roleId: (0, typeorm_2.In)(CUSTOMER_ROLES) },
            relations: ['province', 'district', 'ward', 'street'],
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Không tìm thấy khách hàng với ID ${id}`);
        }
        return customer;
    }
    async create(createCustomerDto, createdBy) {
        if (createCustomerDto.phone) {
            const existingCustomer = await this.userRepository.findOne({
                where: { phone: (0, typeorm_2.Like)(`%${createCustomerDto.phone}%`) },
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException('Số điện thoại đã tồn tại trong hệ thống');
            }
        }
        const customer = this.userRepository.create({
            ...createCustomerDto,
            username: createCustomerDto.phone || `customer_${Date.now()}`,
            email: createCustomerDto.email || `${Date.now()}@gas.local`,
            passwordHash: '',
            roleId: createCustomerDto.roleId || entities_1.UserRole.CUSTOMER,
        });
        return this.userRepository.save(customer);
    }
    async update(id, updateCustomerDto) {
        const customer = await this.findOne(id);
        Object.assign(customer, updateCustomerDto);
        return this.userRepository.save(customer);
    }
    async remove(id) {
        const customer = await this.findOne(id);
        customer.status = entities_1.UserStatus.INACTIVE;
        await this.userRepository.save(customer);
        return { message: 'Đã vô hiệu hóa khách hàng thành công' };
    }
    async getCustomerTypes() {
        return [
            { id: entities_1.UserType.NORMAL, name: 'Thường' },
            { id: entities_1.UserType.MAINTAIN, name: 'Bảo trì' },
            { id: entities_1.UserType.PTTT, name: 'PTTT' },
            { id: entities_1.UserType.STORE_CARD, name: 'Thẻ kho' },
        ];
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map