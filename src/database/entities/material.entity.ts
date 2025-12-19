import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { MaterialType } from './material-type.entity';

@Entity('gas_gas_materials')
export class Material {
    @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true })
    id: number;

    @Column({ type: 'mediumint', unsigned: true, name: 'parent_id', default: 0 })
    parentId: number;

    @Column({ type: 'varchar', length: 20, name: 'materials_no' })
    materialsNo: string;

    @Column({ type: 'tinytext' })
    name: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    unit: string;

    @Column({ type: 'smallint', unsigned: true, name: 'materials_type_id', nullable: true })
    materialsTypeId: number;

    @Column({ type: 'varchar', length: 300, name: 'name_vi' })
    nameVi: string;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;

    @Column({ type: 'tinytext', name: 'name_store_card', nullable: true })
    nameStoreCard: string;

    @Column({ type: 'int', unsigned: true, nullable: true })
    price: number;

    @Column({ type: 'tinytext', nullable: true })
    image: string;

    @Column({ type: 'mediumint', unsigned: true, name: 'materials_id_vo', default: 0 })
    materialsIdVo: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'display_order', default: 50 })
    displayOrder: number;

    @Column({ type: 'tinytext', name: 'name_invoice', nullable: true })
    nameInvoice: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    weight: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'is_tax', default: 2 })
    isTax: number;

    @Column({ type: 'int', name: 'created_by', default: 0 })
    createdBy: number;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @Column({ type: 'bigint', name: 'created_date_bigint', default: 0 })
    createdDateBigint: number;

    // Tài khoản kế toán
    @Column({ type: 'varchar', length: 22, name: 'supplies_account', nullable: true })
    suppliesAccount: string;

    @Column({ type: 'varchar', length: 22, name: 'cost_price_account', nullable: true })
    costPriceAccount: string;

    @Column({ type: 'varchar', length: 22, name: 'revenue_account', nullable: true })
    revenueAccount: string;

    @Column({ type: 'varchar', length: 22, name: 'discount_account', nullable: true })
    discountAccount: string;

    // Relations
    @ManyToOne(() => MaterialType)
    @JoinColumn({ name: 'materials_type_id' })
    materialType: MaterialType;
}
