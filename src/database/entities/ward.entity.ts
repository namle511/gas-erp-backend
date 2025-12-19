import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Province } from './province.entity';
import { District } from './district.entity';

@Entity('gas_gas_ward')
export class Ward {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'int', unsigned: true, name: 'province_id' })
    provinceId: number;

    @Column({ type: 'int', unsigned: true, name: 'district_id' })
    districtId: number;

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

    @ManyToOne(() => District, (district) => district.wards)
    @JoinColumn({ name: 'district_id' })
    district: District;
}
