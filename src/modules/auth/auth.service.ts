import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserStatus } from '../../database/entities';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: [
                { username, status: UserStatus.ACTIVE },
                { email: username, status: UserStatus.ACTIVE },
            ],
            relations: ['province', 'district', 'ward'],
        });

        if (!user) {
            return null;
        }

        // Kiểm tra password - Yii1 dùng MD5, NestJS dùng bcrypt
        const crypto = require('crypto');
        const md5Hash = crypto.createHash('md5').update(password).digest('hex');

        // Thử MD5 trước (Yii1 legacy format)
        if (user.passwordHash === md5Hash) {
            return user;
        }

        // Thử bcrypt (NestJS format)
        try {
            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (isPasswordValid) {
                return user;
            }
        } catch {
            // Ignore bcrypt errors
        }

        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
        }

        const payload = {
            sub: user.id,
            username: user.username,
            roleId: user.roleId,
        };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.getFullName(),
                roleId: user.roleId,
                provinceId: user.provinceId,
                districtId: user.districtId,
                wardId: user.wardId,
                phone: user.phone,
            },
        };
    }

    async getProfile(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['province', 'district', 'ward', 'street'],
        });

        if (!user) {
            throw new UnauthorizedException('Không tìm thấy người dùng');
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.getFullName(),
            roleId: user.roleId,
            phone: user.phone,
            address: user.address,
            province: user.province,
            district: user.district,
            ward: user.ward,
            street: user.street,
        };
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
