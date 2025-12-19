import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Province } from './province.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';
import { Street } from './street.entity';
import { UserProfile } from './user-profile.entity';

// Role constants từ Yii1
export enum UserRole {
    ADMIN = 1,
    HR = 2,
    ACCOUNTANT = 3,
    SALE = 4,
    AGENT = 5,
    CUSTOMER = 6,
    WAREHOUSE = 7,
    MAINTAIN = 8,
}

// User status
export enum UserStatus {
    INACTIVE = 0,
    ACTIVE = 1,
}

// User type (loại khách hàng)
export enum UserType {
    NORMAL = 0,
    MAINTAIN = 1,
    PTTT = 2,
    STORE_CARD = 3,
}

@Entity('gas_users')
export class User {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    username: string;

    @Column({ type: 'varchar', length: 80 })
    email: string;

    @Column({ type: 'tinytext', name: 'password_hash' })
    passwordHash: string;

    @Column({ type: 'tinytext', name: 'temp_password', nullable: true })
    tempPassword: string;

    @Column({ type: 'tinytext', name: 'first_name', nullable: true })
    firstName: string;

    @Column({ type: 'tinytext', name: 'last_name', nullable: true })
    lastName: string;

    @Column({ type: 'varchar', length: 10, name: 'name_agent', nullable: true })
    nameAgent: string;

    @Column({ type: 'varchar', length: 30, name: 'code_account', nullable: true })
    codeAccount: string;

    @Column({ type: 'varchar', length: 30, name: 'code_bussiness', nullable: true })
    codeBusiness: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'varchar', length: 255, name: 'address_vi', default: '' })
    addressVi: string;

    @Column({ type: 'tinytext', name: 'house_numbers', nullable: true })
    houseNumbers: string;

    @Column({ type: 'smallint', unsigned: true, name: 'province_id', default: 0 })
    provinceId: number;

    @Column({ type: 'smallint', unsigned: true, name: 'channel_id', default: 0 })
    channelId: number;

    @Column({ type: 'mediumint', unsigned: true, name: 'district_id', default: 0 })
    districtId: number;

    @Column({ type: 'mediumint', unsigned: true, name: 'ward_id', default: 0 })
    wardId: number;

    @Column({ type: 'mediumint', unsigned: true, name: 'street_id', default: 0 })
    streetId: number;

    @Column({ type: 'int', unsigned: true, name: 'storehouse_id', default: 0 })
    storehouseId: number;

    @Column({ type: 'int', unsigned: true, name: 'sale_id', default: 0 })
    saleId: number;

    @Column({ type: 'smallint', unsigned: true, name: 'payment_day', default: 0 })
    paymentDay: number;

    @Column({ type: 'decimal', precision: 14, scale: 2, unsigned: true, nullable: true })
    beginning: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'first_char', default: 0 })
    firstChar: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'login_attemp', nullable: true })
    loginAttempt: number;

    @CreateDateColumn({ name: 'created_date', nullable: true })
    createdDate: Date;

    @Column({ type: 'bigint', unsigned: true, name: 'created_date_bigint', default: 0 })
    createdDateBigint: number;

    @Column({ type: 'datetime', name: 'last_logged_in', nullable: true })
    lastLoggedIn: Date;

    @Column({ type: 'varchar', length: 30, name: 'ip_address', default: '' })
    ipAddress: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'role_id' })
    roleId: number;

    @Column({ type: 'int', unsigned: true, name: 'application_id', default: 0 })
    applicationId: number;

    @Column({ type: 'tinyint', unsigned: true, default: UserStatus.ACTIVE })
    status: number;

    @Column({ type: 'varchar', length: 6, nullable: true })
    gender: string;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 100, name: 'verify_code', nullable: true })
    verifyCode: string;

    @Column({ type: 'bigint', unsigned: true, name: 'area_code_id', default: 0 })
    areaCodeId: number;

    @Column({ type: 'int', unsigned: true, name: 'parent_id', default: 0 })
    parentId: number;

    @Column({ type: 'tinytext', nullable: true })
    slug: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'is_maintain', default: 0 })
    isMaintain: number;

    @Column({ type: 'tinyint', unsigned: true, default: 0 })
    type: number;

    @Column({ type: 'text', name: 'address_temp', nullable: true })
    addressTemp: string;

    @Column({ type: 'date', name: 'last_purchase', nullable: true })
    lastPurchase: Date;

    @Column({ type: 'int', unsigned: true, name: 'created_by', default: 0 })
    createdBy: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    price: string;

    @Column({ type: 'int', unsigned: true, name: 'price_other', nullable: true })
    priceOther: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'flag_fix_update', default: 0 })
    flagFixUpdate: number;

    // Relations
    @ManyToOne(() => Province, { nullable: true })
    @JoinColumn({ name: 'province_id' })
    province: Province;

    @ManyToOne(() => District, { nullable: true })
    @JoinColumn({ name: 'district_id' })
    district: District;

    @ManyToOne(() => Ward, { nullable: true })
    @JoinColumn({ name: 'ward_id' })
    ward: Ward;

    @ManyToOne(() => Street, { nullable: true })
    @JoinColumn({ name: 'street_id' })
    street: Street;

    @OneToOne(() => UserProfile, profile => profile.user)
    profile: UserProfile;

    // Note: agent and sale are User references but we don't use ManyToOne 
    // to avoid circular reference issues. Use agentId/saleId columns instead.

    // Helper methods
    getFullName(): string {
        return `${this.firstName || ''} ${this.lastName || ''}`.trim();
    }

    isAdmin(): boolean {
        return this.roleId === UserRole.ADMIN;
    }

    isAgent(): boolean {
        return this.roleId === UserRole.AGENT;
    }

    isCustomer(): boolean {
        return this.roleId === UserRole.CUSTOMER;
    }
}
