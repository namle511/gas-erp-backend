import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entities';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            fullName: string;
            roleId: number;
            provinceId: number;
            districtId: number;
            wardId: number;
            phone: string;
        };
    }>;
    getProfile(userId: number): Promise<{
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        fullName: string;
        roleId: number;
        phone: string;
        address: string;
        province: import("../../database/entities").Province;
        district: import("../../database/entities").District;
        ward: import("../../database/entities").Ward;
        street: import("../../database/entities").Street;
    }>;
    hashPassword(password: string): Promise<string>;
}
