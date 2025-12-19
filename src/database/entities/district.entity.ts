import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Province } from './province.entity';
import { Ward } from './ward.entity';

@Entity('gas_gas_district')
export class District {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'int', unsigned: true, name: 'province_id' })
    provinceId: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 100, name: 'short_name', nullable: true })
    shortName: string;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;

    @Column({ type: 'int', unsigned: true, name: 'user_id_create', nullable: true })
    userIdCreate: number;

    // Relations
    @ManyToOne(() => Province, (province) => province.districts)
    @JoinColumn({ name: 'province_id' })
    province: Province;

    @OneToMany(() => Ward, (ward) => ward.district)
    wards: Ward[];
}
