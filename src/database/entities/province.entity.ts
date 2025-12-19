import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { District } from './district.entity';

@Entity('gas_gas_province')
export class Province {
    @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 150, name: 'short_name', nullable: true })
    shortName: string;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;

    @Column({ type: 'varchar', length: 150, nullable: true })
    slug: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'display_order', default: 50 })
    displayOrder: number;

    // Relations
    @OneToMany(() => District, (district) => district.province)
    districts: District[];
}
