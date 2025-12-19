import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
interface RequestWithUser {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(roleId?: string, status?: string, provinceId?: string, search?: string, page?: string, limit?: string): Promise<{
        data: {
            roleName: string;
            parentName: string | null;
            dateBeginJob: Date;
            leaveDate: Date;
            createdByName: string | null;
            id: number;
            username: string;
            email: string;
            passwordHash: string;
            tempPassword: string;
            firstName: string;
            lastName: string;
            nameAgent: string;
            codeAccount: string;
            codeBusiness: string;
            address: string;
            addressVi: string;
            houseNumbers: string;
            provinceId: number;
            channelId: number;
            districtId: number;
            wardId: number;
            streetId: number;
            storehouseId: number;
            saleId: number;
            paymentDay: number;
            beginning: number;
            firstChar: number;
            loginAttempt: number;
            createdDate: Date;
            createdDateBigint: number;
            lastLoggedIn: Date;
            ipAddress: string;
            roleId: number;
            applicationId: number;
            status: number;
            gender: string;
            phone: string;
            verifyCode: string;
            areaCodeId: number;
            parentId: number;
            slug: string;
            isMaintain: number;
            type: number;
            addressTemp: string;
            lastPurchase: Date;
            createdBy: number;
            price: string;
            priceOther: number;
            flagFixUpdate: number;
            province: import("../../database/entities").Province;
            district: import("../../database/entities").District;
            ward: import("../../database/entities").Ward;
            street: import("../../database/entities").Street;
            profile: import("../../database/entities").UserProfile;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getRoles(): Promise<{
        id: import("../../database/entities").UserRole;
        name: string;
    }[]>;
    findOne(id: number): Promise<import("../../database/entities").User>;
    create(createUserDto: CreateUserDto, req: RequestWithUser): Promise<import("../../database/entities").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("../../database/entities").User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
