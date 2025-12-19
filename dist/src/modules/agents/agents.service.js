"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
const bcrypt = __importStar(require("bcrypt"));
const AGENT_ROLE_ID = 5;
let AgentsService = class AgentsService {
    userRepository;
    roleRepository;
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async findAll(query) {
        const where = {
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
            queryBuilder = queryBuilder.andWhere('(user.firstName LIKE :search OR user.nameAgent LIKE :search OR user.phone LIKE :search OR user.codeBusiness LIKE :search OR user.addressVi LIKE :search)', { search: `%${query.search}%` });
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
    async findOne(id) {
        const agent = await this.userRepository.findOne({
            where: { id, roleId: AGENT_ROLE_ID },
            relations: ['province', 'district', 'ward', 'street'],
        });
        if (!agent) {
            throw new common_1.NotFoundException(`Đại lý với ID ${id} không tồn tại`);
        }
        return agent;
    }
    async create(createAgentDto, createdBy) {
        const existingUser = await this.userRepository.findOne({
            where: { username: createAgentDto.username },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Tên đăng nhập đã tồn tại');
        }
        const existingEmail = await this.userRepository.findOne({
            where: { email: createAgentDto.email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException('Email đã tồn tại');
        }
        const hashedPassword = await bcrypt.hash(createAgentDto.password, 10);
        const agent = this.userRepository.create({
            ...createAgentDto,
            passwordHash: hashedPassword,
            roleId: AGENT_ROLE_ID,
            status: createAgentDto.status ?? 1,
            createdBy,
            createdDate: new Date(),
        });
        delete agent.password;
        return this.userRepository.save(agent);
    }
    async update(id, updateAgentDto) {
        const agent = await this.findOne(id);
        if (updateAgentDto.username && updateAgentDto.username !== agent.username) {
            const existingUser = await this.userRepository.findOne({
                where: { username: updateAgentDto.username },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Tên đăng nhập đã tồn tại');
            }
        }
        if (updateAgentDto.email && updateAgentDto.email !== agent.email) {
            const existingEmail = await this.userRepository.findOne({
                where: { email: updateAgentDto.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('Email đã tồn tại');
            }
        }
        if (updateAgentDto.password) {
            agent.passwordHash = await bcrypt.hash(updateAgentDto.password, 10);
            delete updateAgentDto.password;
        }
        const { password, ...updateData } = updateAgentDto;
        Object.assign(agent, updateData);
        return this.userRepository.save(agent);
    }
    async remove(id) {
        const agent = await this.findOne(id);
        await this.userRepository.remove(agent);
        return { message: 'Đã xóa đại lý thành công' };
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AgentsService);
//# sourceMappingURL=agents.service.js.map