import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus, Role } from '../../database/entities';
import { UserProfile } from '../../database/entities/user-profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Khách hàng có role_id = 4, Đại lý có role_id = 5
// Nhân sự là tất cả các role khác
const EXCLUDED_ROLES = [4, 5];

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(UserProfile)
        private readonly profileRepository: Repository<UserProfile>,
    ) { }

    async findAll(query?: {
        roleId?: number;
        status?: number;
        provinceId?: number;
        search?: string;
        page?: number;
        limit?: number;
    }) {
        const where: any = {
            roleId: Not(In(EXCLUDED_ROLES)), // Loại trừ Khách hàng (4) và Đại lý (5)
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
            queryBuilder = queryBuilder.andWhere(
                '(user.firstName LIKE :search OR user.username LIKE :search OR user.email LIKE :search OR user.phone LIKE :search)',
                { search: `%${query.search}%` }
            );
        }

        const [users, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('user.id', 'DESC')
            .getManyAndCount();

        // Lấy tất cả roles để map tên
        const roles = await this.roleRepository.find();
        const roleMap = new Map(roles.map(r => [r.id, r.roleName]));

        // Lấy tất cả parent IDs để lookup nơi công tác
        const parentIds = [...new Set(users.map(u => u.parentId).filter(id => id > 0))];
        let parentMap: Map<number, string> = new Map();

        if (parentIds.length > 0) {
            const parents = await this.userRepository.find({
                where: { id: In(parentIds) },
                select: ['id', 'firstName'],
            });
            parents.forEach(p => parentMap.set(p.id, p.firstName));
        }

        // Lấy tất cả created_by IDs để lookup người tạo
        const createdByIds = [...new Set(users.map(u => u.createdBy).filter(id => id > 0))];
        let createdByMap: Map<number, string> = new Map();

        if (createdByIds.length > 0) {
            const creators = await this.userRepository.find({
                where: { id: In(createdByIds) },
                select: ['id', 'firstName'],
            });
            creators.forEach(c => createdByMap.set(c.id, c.firstName));
        }

        // Map roleName, parentName, dateBeginJob, leaveDate, createdByName vào users
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

    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['province', 'district', 'ward', 'street', 'profile'],
        });

        if (!user) {
            throw new NotFoundException(`Không tìm thấy nhân sự với ID ${id}`);
        }

        return user;
    }

    async create(createUserDto: CreateUserDto, createdBy: number) {
        // Check username unique
        const existingUser = await this.userRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });

        if (existingUser) {
            if (existingUser.username === createUserDto.username) {
                throw new BadRequestException('Tên đăng nhập đã tồn tại');
            }
            if (existingUser.email === createUserDto.email) {
                throw new BadRequestException('Email đã tồn tại');
            }
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // Extract profile data before creating user
        const { profile: profileData, ...userData } = createUserDto;

        const user = this.userRepository.create({
            ...userData,
            passwordHash: hashedPassword,
        });

        const savedUser = await this.userRepository.save(user);

        // Create profile if profile data provided
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

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);

        // Extract profile data
        const { profile: profileData, ...userData } = updateUserDto;
        const updateData: any = { ...userData };

        if ('password' in updateUserDto && updateUserDto.password) {
            updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
            delete updateData.password;
        }

        Object.assign(user, updateData);
        await this.userRepository.save(user);

        // Update or create profile if profile data provided
        if (profileData) {
            let profile = await this.profileRepository.findOne({ where: { userId: id } });
            if (profile) {
                Object.assign(profile, profileData);
                await this.profileRepository.save(profile);
            } else {
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

    async remove(id: number) {
        const user = await this.findOne(id);
        // Soft delete - chỉ đổi status
        user.status = UserStatus.INACTIVE;
        await this.userRepository.save(user);
        return { message: 'Đã vô hiệu hóa nhân sự thành công' };
    }

    async getRoles() {
        return [
            { id: UserRole.ADMIN, name: 'Admin' },
            { id: UserRole.HR, name: 'Nhân sự' },
            { id: UserRole.ACCOUNTANT, name: 'Kế toán' },
            { id: UserRole.SALE, name: 'Kinh doanh' },
            { id: UserRole.WAREHOUSE, name: 'Kho' },
            { id: UserRole.MAINTAIN, name: 'Bảo trì' },
        ];
    }
}
