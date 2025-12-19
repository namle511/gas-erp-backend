import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
interface RequestWithUser extends Request {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getProfile(req: RequestWithUser): Promise<{
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
    logout(): Promise<{
        message: string;
    }>;
}
export {};
