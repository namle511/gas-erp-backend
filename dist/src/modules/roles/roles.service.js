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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../../database/entities/role.entity");
let RolesService = class RolesService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async findAll(query) {
        const where = {};
        if (query?.status !== undefined) {
            where.status = query.status;
        }
        const page = query?.page || 1;
        const limit = query?.limit || 50;
        let queryBuilder = this.roleRepository.createQueryBuilder('role')
            .where(where);
        if (query?.search) {
            queryBuilder = queryBuilder.andWhere('(role.roleName LIKE :search OR role.roleShortName LIKE :search)', { search: `%${query.search}%` });
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
    async findOne(id) {
        const role = await this.roleRepository.findOne({
            where: { id },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Không tìm thấy vai trò với ID ${id}`);
        }
        return role;
    }
    async create(createRoleDto) {
        const existingRole = await this.roleRepository.findOne({
            where: { roleName: createRoleDto.roleName },
        });
        if (existingRole) {
            throw new common_1.BadRequestException('Tên vai trò đã tồn tại');
        }
        const role = this.roleRepository.create({
            ...createRoleDto,
            status: createRoleDto.status ?? 1,
            applicationId: createRoleDto.applicationId ?? 1,
        });
        return this.roleRepository.save(role);
    }
    async update(id, updateRoleDto) {
        const role = await this.findOne(id);
        Object.assign(role, updateRoleDto);
        return this.roleRepository.save(role);
    }
    async remove(id) {
        const role = await this.findOne(id);
        role.status = 0;
        await this.roleRepository.save(role);
        return { message: 'Đã vô hiệu hóa vai trò thành công' };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map