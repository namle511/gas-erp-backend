import { Province } from './province.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';
import { Street } from './street.entity';
import { UserProfile } from './user-profile.entity';
export declare enum UserRole {
    ADMIN = 1,
    HR = 2,
    ACCOUNTANT = 3,
    SALE = 4,
    AGENT = 5,
    CUSTOMER = 6,
    WAREHOUSE = 7,
    MAINTAIN = 8
}
export declare enum UserStatus {
    INACTIVE = 0,
    ACTIVE = 1
}
export declare enum UserType {
    NORMAL = 0,
    MAINTAIN = 1,
    PTTT = 2,
    STORE_CARD = 3
}
export declare class User {
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
    province: Province;
    district: District;
    ward: Ward;
    street: Street;
    profile: UserProfile;
    getFullName(): string;
    isAdmin(): boolean;
    isAgent(): boolean;
    isCustomer(): boolean;
}
