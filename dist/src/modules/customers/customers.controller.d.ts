import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
interface RequestWithUser {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(roleId?: string, type?: string, status?: string, provinceId?: string, search?: string, page?: string, limit?: string): Promise<{
        data: {
            agent: any;
            sale: any;
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
    getCustomerTypes(): Promise<{
        id: import("../../database/entities").UserType;
        name: string;
    }[]>;
    searchHgd(term?: string, customerType?: string, agentId?: string, limit?: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
        username: string;
        isMaintain: number;
    }[]>;
    findOne(id: number): Promise<import("../../database/entities").User>;
    create(createCustomerDto: CreateCustomerDto, req: RequestWithUser): Promise<import("../../database/entities").User>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<import("../../database/entities").User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
