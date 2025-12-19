import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Material } from './material.entity';

@Entity('gas_gas_materials_type')
export class MaterialType {
    @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'group_type', default: 1 })
    groupType: number;

    // Tài khoản kế toán mặc định cho loại vật tư
    @Column({ type: 'varchar', length: 22, name: 'supplies_account', nullable: true })
    suppliesAccount: string;

    @Column({ type: 'varchar', length: 22, name: 'cost_price_account', nullable: true })
    costPriceAccount: string;

    @Column({ type: 'varchar', length: 22, name: 'revenue_account', nullable: true })
    revenueAccount: string;

    @Column({ type: 'varchar', length: 22, name: 'discount_account', nullable: true })
    discountAccount: string;

    @Column({ type: 'varchar', length: 22, name: 'returned_account', nullable: true })
    returnedAccount: string;

    @Column({ type: 'text', name: 'link_content', nullable: true })
    linkContent: string;

    // Relations
    @OneToMany(() => Material, (material) => material.materialType)
    materials: Material[];
}
