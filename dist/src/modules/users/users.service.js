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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const entities_1 = require("../../database/entities");
const user_profile_entity_1 = require("../../database/entities/user-profile.entity");
const EXCLUDED_ROLES = [4, 5];
let UsersService = class UsersService {
    userRepository;
    roleRepository;
    profileRepository;
    constructor(userRepository, roleRepository, profileRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.profileRepository = profileRepository;
    }
    async findAll(query) {
        const where = {
            roleId: (0, typeorm_2.Not)((0, typeorm_2.In)(EXCLUDED_ROLES)),
        };
        if (query?.roleId) {
            where.roleId = query.roleId;
        }
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
            .leftJoinAndSelect('user.profile', 'profile')
            .where(where);
        if (query?.search) {
            queryBuilder = queryBuilder.andWhere('(user.firstName LIKE :search OR user.username LIKE :search OR user.email LIKE :search OR user.phone LIKE :search)', { search: `%${query.search}%` });
        }
        const [users, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('user.id', 'DESC')
            .getManyAndCount();
        const roles = await this.roleRepository.find();
        const roleMap = new Map(roles.map(r => [r.id, r.roleName]));
        const parentIds = [...new Set(users.map(u => u.parentId).filter(id => id > 0))];
        let parentMap = new Map();
        if (parentIds.length > 0) {
            const parents = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(parentIds) },
                select: ['id', 'firstName'],
            });
            parents.forEach(p => parentMap.set(p.id, p.firstName));
        }
        const createdByIds = [...new Set(users.map(u => u.createdBy).filter(id => id > 0))];
        let createdByMap = new Map();
        if (createdByIds.length > 0) {
            const creators = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(createdByIds) },
                select: ['id', 'firstName'],
            });
            creators.forEach(c => createdByMap.set(c.id, c.firstName));
        }
        const usersWithExtras = users.map(user => ({
            ...user,
            roleName: roleMap.get(user.roleId) || `Role ${user.roleId}`,
            parentName: user.parentId > 0 ? parentMap.get(user.parentId) || null : null,
            dateBeginJob: user.profile?.dateBeginJob || null,
            leaveDate: user.profile?.leaveDate || null,
            createdByName: user.createdBy > 0 ? createdByMap.get(user.createdBy) || null : null,
        }));
        return {
            data: usersWithExtras,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['province', 'district', 'ward', 'street', 'profile'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân sự với ID ${id}`);
        }
        return user;
    }
    async create(createUserDto, createdBy) {
        const existingUser = await this.userRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });
        if (existingUser) {
            if (existingUser.username === createUserDto.username) {
                throw new common_1.BadRequestException('Tên đăng nhập đã tồn tại');
            }
            if (existingUser.email === createUserDto.email) {
                throw new common_1.BadRequestException('Email đã tồn tại');
            }
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const { profile: profileData, ...userData } = createUserDto;
        const user = this.userRepository.create({
            ...userData,
            passwordHash: hashedPassword,
        });
        const savedUser = await this.userRepository.save(user);
        if (profileData) {
            const profile = this.profileRepository.create({
                ...profileData,
                userId: savedUser.id,
                type: 1,
            });
            await this.profileRepository.save(profile);
        }
        return this.findOne(savedUser.id);
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        const { profile: profileData, ...userData } = updateUserDto;
        const updateData = { ...userData };
        if ('password' in updateUserDto && updateUserDto.password) {
            updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
            delete updateData.password;
        }
        Object.assign(user, updateData);
        await this.userRepository.save(user);
        if (profileData) {
            let profile = await this.profileRepository.findOne({ where: { userId: id } });
            if (profile) {
                Object.assign(profile, profileData);
                await this.profileRepository.save(profile);
            }
            else {
                profile = this.profileRepository.create({
                    ...profileData,
                    userId: id,
                    type: 1,
                });
                await this.profileRepository.save(profile);
            }
        }
        return this.findOne(id);
    }
    async remove(id) {
        const user = await this.findOne(id);
        user.status = entities_1.UserStatus.INACTIVE;
        await this.userRepository.save(user);
        return { message: 'Đã vô hiệu hóa nhân sự thành công' };
    }
    async getRoles() {
        return [
            { id: entities_1.UserRole.ADMIN, name: 'Admin' },
            { id: entities_1.UserRole.HR, name: 'Nhân sự' },
            { id: entities_1.UserRole.ACCOUNTANT, name: 'Kế toán' },
            { id: entities_1.UserRole.SALE, name: 'Kinh doanh' },
            { id: entities_1.UserRole.WAREHOUSE, name: 'Kho' },
            { id: entities_1.UserRole.MAINTAIN, name: 'Bảo trì' },
        ];
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map