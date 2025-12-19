import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('gas_users_profile')
export class UserProfile {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'int', unsigned: true, name: 'user_id' })
    userId: number;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'tinyint', unsigned: true, default: 1, nullable: true })
    type: number;

    @Column({ type: 'int', unsigned: true, name: 'parent_id', default: 0, nullable: true })
    parentId: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'country_id', default: 1, nullable: true })
    countryId: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'type_nation', nullable: true })
    typeNation: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'type_religion', nullable: true })
    typeReligion: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'type_education', nullable: true })
    typeEducation: number;

    @Column({ type: 'varchar', length: 20, name: 'id_number', nullable: true })
    idNumber: string;

    @Column({ type: 'int', unsigned: true, name: 'id_province', nullable: true })
    idProvince: number;

    @Column({ type: 'date', name: 'id_created_date', nullable: true })
    idCreatedDate: Date;

    @Column({ type: 'tinyint', unsigned: true, name: 'status_marital', nullable: true })
    statusMarital: number;

    @Column({ type: 'date', name: 'date_begin_job', nullable: true })
    dateBeginJob: Date;

    @Column({ type: 'tinyint', unsigned: true, name: 'contract_type', nullable: true })
    contractType: number;

    @Column({ type: 'date', name: 'contract_begin', nullable: true })
    contractBegin: Date;

    @Column({ type: 'date', name: 'contract_end', nullable: true })
    contractEnd: Date;

    @Column({ type: 'tinyint', unsigned: true, name: 'position_work', nullable: true })
    positionWork: number;

    @Column({ type: 'tinyint', unsigned: true, name: 'position_room', nullable: true })
    positionRoom: number;

    @Column({ type: 'date', name: 'leave_date', nullable: true })
    leaveDate: Date;

    @Column({ type: 'decimal', precision: 14, scale: 2, name: 'base_salary', nullable: true })
    baseSalary: number;

    @Column({ type: 'int', unsigned: true, name: 'bank_id', nullable: true })
    bankId: number;

    @Column({ type: 'varchar', length: 30, name: 'bank_no', nullable: true })
    bankNo: string;

    @Column({ type: 'varchar', length: 100, name: 'bank_branch', nullable: true })
    bankBranch: string;

    @Column({ type: 'varchar', length: 20, name: 'social_insurance_no', nullable: true })
    socialInsuranceNo: string;

    @Column({ type: 'varchar', length: 20, name: 'tax_no', nullable: true })
    taxNo: string;

    @Column({ type: 'tinyint', unsigned: true, name: 'salary_method', nullable: true })
    salaryMethod: number;

    @Column({ type: 'int', unsigned: true, name: 'address_home_province', nullable: true })
    addressHomeProvince: number;

    @Column({ type: 'int', unsigned: true, name: 'address_live_province', nullable: true })
    addressLiveProvince: number;

    @Column({ type: 'text', nullable: true })
    json: string;

    @Column({ type: 'int', unsigned: true, name: 'update_by', nullable: true })
    updateBy: number;

    @Column({ type: 'datetime', name: 'update_time', nullable: true })
    updateTime: Date;
}
