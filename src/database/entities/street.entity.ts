import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Province } from './province.entity';

@Entity('gas_gas_street')
export class Street {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'int', unsigned: true, name: 'province_id', nullable: true })
    provinceId: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'varchar', length: 200, name: 'name_vi', nullable: true })
    nameVi: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    slug: string;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;

    @Column({ type: 'int', unsigned: true, name: 'user_id_create', nullable: true })
    userIdCreate: number;

    // Relations
    @ManyToOne(() => Province)
    @JoinColumn({ name: 'province_id' })
    province: Province;
}
