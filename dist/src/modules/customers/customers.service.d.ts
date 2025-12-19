import { Repository } from 'typeorm';
import { User, UserType } from '../../database/entities';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(query?: {
        roleId?: number;
        type?: number;
        status?: number;
        provinceId?: number;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
    searchHgd(query: {
        term?: string;
        customerType?: string;
        agentId?: number;
        limit?: number;
    }): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
        username: string;
        isMaintain: number;
    }[]>;
    findOne(id: number): Promise<User>;
    create(createCustomerDto: CreateCustomerDto, createdBy: number): Promise<User>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getCustomerTypes(): Promise<{
        id: UserType;
        name: string;
    }[]>;
}
