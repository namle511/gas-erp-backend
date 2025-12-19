import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sell } from './sell.entity';
import { Material } from './material.entity';

@Entity('gas_sell_detail')
export class SellDetail {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;

    @Column({ type: 'int', unsigned: true, name: 'sell_id' })
    sellId: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'order_type', default: 1, comment: '1: normal, 2: bộ bình, 3: Thế chân' })
    orderType: number;

    @Column({ type: 'mediumint', name: 'type_amount', default: 0 })
    typeAmount: number;

    @Column({ type: 'tinyint', name: 'order_type_status', default: 0, comment: 'trạng thái thế chân' })
    orderTypeStatus: number;

    @Column({ type: 'int', unsigned: true, name: 'customer_id' })
    customerId: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'type_customer' })
    typeCustomer: number;

    @Column({ type: 'int', unsigned: true, name: 'sale_id', default: 0 })
    saleId: number;

    @Column({ type: 'int', unsigned: true, name: 'monitoring_id', nullable: true })
    monitoringId: number;

    @Column({ type: 'int', unsigned: true, name: 'agent_id' })
    agentId: number;

    @Column({ type: 'smallint', unsigned: true, name: 'province_id', nullable: true })
    provinceId: number;

    @Column({ type: 'int', unsigned: true, name: 'uid_login' })
    uidLogin: number;

    @Column({ type: 'int', unsigned: true, name: 'employee_maintain_id', default: 0 })
    employeeMaintainId: number;

    @Column({ type: 'smallint', unsigned: true, name: 'materials_parent_id' })
    materialsParentId: number;

    @Column({ type: 'smallint', unsigned: true, name: 'materials_type_id', default: 0 })
    materialsTypeId: number;

    @Column({ type: 'smallint', unsigned: true, name: 'materials_id' })
    materialsId: number;

    @Column({ type: 'decimal', precision: 11, scale: 2 })
    qty: number;

    @Column({ type: 'int', unsigned: true })
    price: number;

    @Column({ type: 'int', unsigned: true, name: 'price_root', default: 0 })
    priceRoot: number;

    @Column({ type: 'int', unsigned: true })
    amount: number;

    @Column({ type: 'int', default: 0 })
    seri: number;

    @Column({ type: 'date', name: 'created_date_only' })
    createdDateOnly: Date;

    @Column({ type: 'bigint', unsigned: true, name: 'created_date_only_bigint', default: 0, comment: 'time in second' })
    createdDateOnlyBigint: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'qty_discount', default: 0, comment: 'slg chiet khau, only Gas' })
    qtyDiscount: number;

    @Column({ type: 'int', unsigned: true, name: 'amount_discount', nullable: true, comment: 'tiền CK có thể đại lý sửa' })
    amountDiscount: number;

    @Column({ type: 'int', unsigned: true, name: 'amount_bu_vo', default: 0 })
    amountBuVo: number;

    @Column({ type: 'int', unsigned: true, name: 'promotion_id', default: 0 })
    promotionId: number;

    @Column({ type: 'mediumint', unsigned: true, name: 'promotion_amount', default: 0 })
    promotionAmount: number;

    @Column({ type: 'tinyint', name: 'source', default: 1, comment: '1: from c#, 2 from app, 3: callcenter' })
    source: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, name: 'gas_remain', default: 0 })
    gasRemain: number;

    @Column({ type: 'int', name: 'gas_remain_amount', default: 0 })
    gasRemainAmount: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, name: 'kg_empty', default: 0 })
    kgEmpty: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, name: 'kg_has_gas', default: 0 })
    kgHasGas: number;

    @Column({ type: 'int', unsigned: true, name: 'v1_discount_id', default: 0 })
    v1DiscountId: number;

    @Column({ type: 'int', unsigned: true, name: 'v1_discount_amount', default: 0 })
    v1DiscountAmount: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'payment_type', default: 1 })
    paymentType: number;

    @Column({ type: 'int', name: 'promotion_extra_id', default: 0 })
    promotionExtraId: number;

    @Column({ type: 'int', name: 'promotion_extra_amount', default: 0 })
    promotionExtraAmount: number;

    // Relations
    @ManyToOne(() => Sell, sell => sell.details)
    @JoinColumn({ name: 'sell_id' })
    sell: Sell;

    @ManyToOne(() => Material)
    @JoinColumn({ name: 'materials_id' })
    material: Material;
}
