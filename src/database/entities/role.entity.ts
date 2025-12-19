import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('gas_roles')
export class Role {
    @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255, name: 'role_name' })
    roleName: string;

    @Column({ type: 'varchar', length: 255, name: 'role_short_name' })
    roleShortName: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'application_id' })
    applicationId: number;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    status: number;
}
