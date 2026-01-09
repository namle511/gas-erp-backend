import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { SellDetail } from './sell-detail.entity';
import { User } from './user.entity';

// Status constants
export enum SellStatus {
    NEW = 1,
    PAID = 2,      // Hoàn thành
    CANCEL = 3,    // Hủy
}

// Order type constants
export enum SellOrderType {
    NORMAL = 1,           // Bình thường
    BO_BINH = 2,          // Bộ bình
    THE_CHAN = 3,         // Thế chân
    THU_VO = 4,           // Thu vỏ
    BAN_GAS_VO = 5,       // Gas + Vỏ
    WATER = 6,            // Bán nước uống
    WATER_THE_CHAN = 7,   // Thế chân vỏ nước
    WATER_THU_VO = 8,     // Thu vỏ nước
    FREE = 9,             // Tặng KH
    CONSUMER_GOODS = 10,  // Hàng tiêu dùng
    ELECTRIC = 11,        // Hàng điện máy
    GIAT_UI = 12,         // Giặt ủi
}

// Source constants
export enum SellSource {
    WINDOW = 1,       // PMBH C#
    APP = 2,          // APP
    WEB = 3,          // Call center
    AUTO_SALES = 4,   // 1900 Auto Sales
    MOMO = 5,
    SENDO = 6,
    TIKI = 7,
    HIFPT = 8,
    WEB_GAS24H = 9,
    TECHRES = 10,
}

// Payment type constants
export enum SellPaymentType {
    CASH = 1,
    VNPAY = 2,
    MOMO = 3,
    SENDO = 4,
    NAPAS = 5,
    TIKI = 6,
    HIFPT = 7,
    QR_BANK_TRANSFER = 8,
}

@Entity('gas_sell')
export class Sell {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'tinyint', name: 'first_order', default: 0, comment: '1: is first order' })
    firstOrder: number;

    @Column({ type: 'tinyint', unsigned: true, default: 1, comment: '1: from c#, 2 from app, 3: callcenter' })
    source: number;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'status_cancel', default: 0, comment: 'lý do hủy đơn hàng' })
    statusCancel: number;

    @Column({ type: 'varchar', length: 15, name: 'code_no' })
    codeNo: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'order_type', default: 1, comment: '1: normal, 2: bộ bình, 3: Thế chân' })
    orderType: number;

    @Column({ type: 'mediumint', unsigned: true, name: 'type_amount', default: 0 })
    typeAmount: number;

    @Column({ type: 'tinyint', name: 'order_type_status', default: 0, comment: 'trạng thái thế chân' })
    orderTypeStatus: number;

    @Column({ type: 'int', unsigned: true, name: 'customer_id' })
    customerId: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'type_customer' })
    typeCustomer: number;

    @Column({ type: 'int', unsigned: true })
    phone: number;

    @Column({ type: 'int', unsigned: true, name: 'sale_id', nullable: true })
    saleId: number;

    @Column({ type: 'tinytext', name: 'first_name', nullable: true })
    firstName: string;

    @Column({ type: 'int', unsigned: true, name: 'agent_id' })
    agentId: number;

    @Column({ type: 'smallint', unsigned: true, name: 'province_id', nullable: true })
    provinceId: number;

    @Column({ type: 'int', unsigned: true, name: 'employee_maintain_id', nullable: true })
    employeeMaintainId: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'role_id_employee', nullable: true })
    roleIdEmployee: number;

    @Column({ type: 'int', unsigned: true, name: 'uid_login', comment: 'NV kế toán BH tạo order' })
    uidLogin: number;

    @Column({ type: 'int', unsigned: true, name: 'call_center_id', default: 0, comment: 'id nv tong dai' })
    callCenterId: number;

    @Column({ type: 'date', name: 'created_date_only' })
    createdDateOnly: Date;

    @Column({ type: 'bigint', unsigned: true, name: 'created_date_only_bigint', default: 0, comment: 'time in second' })
    createdDateOnlyBigint: number;

    @Column({ type: 'datetime', name: 'created_date', nullable: true })
    createdDate: Date;

    @Column({ type: 'bigint', unsigned: true, name: 'created_date_bigint', default: 0 })
    createdDateBigint: number;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column({ type: 'int', unsigned: true, name: 'last_update_by', nullable: true })
    lastUpdateBy: number;

    @Column({ type: 'datetime', name: 'last_update_time', nullable: true })
    lastUpdateTime: Date;

    @Column({ type: 'tinyint', unsigned: true, name: 'qty_discount', default: 0, comment: 'slg chiet khau, ko lay qua KM' })
    qtyDiscount: number;

    @Column({ type: 'int', unsigned: true, name: 'amount_discount', default: 0, comment: 'tiền CK có thể đại lý sửa' })
    amountDiscount: number;

    @Column({ type: 'int', unsigned: true, name: 'amount_bu_vo', default: 0 })
    amountBuVo: number;

    @Column({ type: 'int', unsigned: true, name: 'transaction_history_id', default: 0 })
    transactionHistoryId: number;

    @Column({ type: 'int', unsigned: true, name: 'app_promotion_user_id', default: 0 })
    appPromotionUserId: number;

    @Column({ type: 'int', unsigned: true, name: 'promotion_id', default: 0 })
    promotionId: number;

    @Column({ type: 'mediumint', unsigned: true, name: 'promotion_amount', default: 0 })
    promotionAmount: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'promotion_type', default: 0 })
    promotionType: number;

    @Column({ type: 'int', unsigned: true, default: 0 })
    total: number;

    @Column({ type: 'int', name: 'grand_total', default: 0 })
    grandTotal: number;

    @Column({ type: 'tinytext', nullable: true })
    address: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'support_id', default: 0, comment: 'loại hỗ trợ NVGN' })
    supportId: number;

    @Column({ type: 'varchar', length: 5, name: 'pttt_code', default: '' })
    ptttCode: string;

    @Column({ type: 'int', unsigned: true, name: 'call_id', default: 0 })
    callId: number;

    @Column({ type: 'bigint', name: 'call_end_time', default: 0 })
    callEndTime: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'high_price', default: 0 })
    highPrice: number;

    @Column({ type: 'datetime', name: 'complete_time', nullable: true })
    completeTime: Date;

    @Column({ type: 'bigint', unsigned: true, name: 'complete_time_bigint', default: 0, comment: 'time in second' })
    completeTimeBigint: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'customer_new', default: 0, comment: '1: KH new, 2: old' })
    customerNew: number;

    @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '0: web, 1: android, 2: ios' })
    platform: number;

    @Column({ type: 'int', unsigned: true, name: 'v1_discount_amount', default: 0 })
    v1DiscountAmount: number;

    @Column({ type: 'int', name: 'v1_discount_id', default: 0 })
    v1DiscountId: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, name: 'gas_remain', default: 0 })
    gasRemain: number;

    @Column({ type: 'int', name: 'gas_remain_amount', default: 0 })
    gasRemainAmount: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, name: 'kg_empty', default: 0 })
    kgEmpty: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, name: 'kg_has_gas', default: 0 })
    kgHasGas: number;

    @Column({ type: 'datetime', name: 'delivery_timer', nullable: true, comment: 'hen gio giao hang' })
    deliveryTimer: Date | null;

    @Column({ type: 'tinyint', unsigned: true, name: 'is_timer', default: 0 })
    isTimer: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'payment_type', default: 1, comment: '1: Cash, 2: Bank' })
    paymentType: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    refcode: string;

    @Column({ type: 'int', name: 'code_partner_id', default: 0, comment: 'id ưu đãi đổi thưởng' })
    codePartnerId: number;

    @Column({ type: 'int', name: 'promotion_extra_id', default: 0 })
    promotionExtraId: number;

    @Column({ type: 'int', name: 'promotion_extra_amount', default: 0 })
    promotionExtraAmount: number;

    @Column({ type: 'bigint', name: 'date_paid', default: 0 })
    datePaid: number;

    @Column({ type: 'tinyint', name: 'action_type', default: 0, comment: '0=free, 1=pick, 3=drop, 5=complete' })
    actionType: number;


    // Relations
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'agent_id' })
    agent: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'employee_maintain_id' })
    employeeMaintain: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'sale_id' })
    sale: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'uid_login' })
    userLogin: User;

    @OneToMany(() => SellDetail, detail => detail.sell)
    details: SellDetail[];
}
