import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../../database/entities/user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectRepository(UserProfile)
        private readonly profileRepository: Repository<UserProfile>,
    ) { }

    async findByUserId(userId: number): Promise<UserProfile | null> {
        console.log('Finding profile for userId:', userId);
        const profile = await this.profileRepository.findOne({
            where: { userId },
        });
        console.log('Found profile:', profile ? profile.id : 'null');
        return profile;
    }

    async findOne(id: number): Promise<UserProfile> {
        const profile = await this.profileRepository.findOne({ where: { id } });
        if (!profile) {
            throw new NotFoundException(`Không tìm thấy hồ sơ với ID ${id}`);
        }
        return profile;
    }

    async create(dto: CreateUserProfileDto): Promise<UserProfile> {
        const profile = this.profileRepository.create({
            ...dto,
            type: dto.type ?? 1,
        });
        return this.profileRepository.save(profile);
    }

    async update(id: number, dto: UpdateUserProfileDto): Promise<UserProfile> {
        const profile = await this.findOne(id);
        Object.assign(profile, dto);
        return this.profileRepository.save(profile);
    }

    async upsertByUserId(userId: number, dto: UpdateUserProfileDto): Promise<UserProfile> {
        let profile = await this.findByUserId(userId);

        if (profile) {
            Object.assign(profile, dto);
            return this.profileRepository.save(profile);
        } else {
            const newProfile = this.profileRepository.create({
                ...dto,
                userId,
                type: 1,
            });
            return this.profileRepository.save(newProfile);
        }
    }

    async remove(id: number): Promise<{ message: string }> {
        const profile = await this.findOne(id);
        await this.profileRepository.remove(profile);
        return { message: 'Đã xóa hồ sơ thành công' };
    }

    // === Dropdown Options ===
    getCountryOptions() {
        return [
            { value: 1, label: 'Việt Nam' },
            { value: 2, label: 'Trung Quốc' },
            { value: 3, label: 'Lào' },
            { value: 4, label: 'Campuchia' },
            { value: 5, label: 'Singapore' },
        ];
    }

    getNationOptions() {
        return [
            { value: 1, label: 'Kinh (Việt)' }, { value: 2, label: 'Tày' }, { value: 55, label: 'Thái' },
            { value: 3, label: 'Mường' }, { value: 4, label: 'Khmer' }, { value: 5, label: 'Hoa' },
            { value: 6, label: 'Nùng' }, { value: 7, label: "H'Mông" }, { value: 8, label: 'Dao' },
            { value: 54, label: 'Người nước ngoài' },
        ];
    }

    getReligionOptions() {
        return [
            { value: 1, label: 'Phật giáo' }, { value: 2, label: 'Công giáo' }, { value: 3, label: 'Tin Lành' },
            { value: 4, label: 'Cao Đài' }, { value: 5, label: 'Phật giáo Hòa Hảo' }, { value: 6, label: 'Hồi giáo' },
        ];
    }

    getEducationOptions() {
        return [
            { value: 7, label: 'Chưa học hết 12' }, { value: 1, label: '12/12' }, { value: 2, label: 'Trung cấp' },
            { value: 3, label: 'Cao đẳng' }, { value: 4, label: 'Đại học' }, { value: 5, label: 'Thạc sĩ' }, { value: 6, label: 'Tiến sĩ' },
        ];
    }

    getMaritalOptions() {
        return [
            { value: 1, label: 'Độc thân' }, { value: 2, label: 'Đã kết hôn' },
        ];
    }

    getContractTypeOptions() {
        return [
            { value: 1, label: 'Thử việc' }, { value: 2, label: '1 năm' }, { value: 3, label: '3 năm' },
            { value: 4, label: 'Không thời hạn' }, { value: 5, label: 'Part time' },
            { value: 6, label: 'Chờ phỏng vấn' }, { value: 7, label: 'Thực tập sinh' },
        ];
    }

    getWorkRoomOptions() {
        return [
            { value: 1, label: 'Ban giám đốc' }, { value: 2, label: 'PTTT' }, { value: 3, label: 'Phòng công nghệ' },
            { value: 4, label: 'Phòng kế toán' }, { value: 5, label: 'Phòng kinh doanh' }, { value: 6, label: 'Phòng kỹ thuật' },
            { value: 7, label: 'Phòng Marketing' }, { value: 8, label: 'Phòng pháp chế' }, { value: 9, label: 'Phòng tổng đài' },
            { value: 10, label: 'Phòng vật tư' }, { value: 16, label: 'PVKH' }, { value: 25, label: 'Phòng telesale' },
            { value: 26, label: 'CCS' }, { value: 27, label: 'BP Xưởng' }, { value: 28, label: 'Phòng giặt sấy' },
            { value: 29, label: 'Phòng KD thiết bị' }, { value: 30, label: 'Phòng nhân sự' }, { value: 31, label: 'Phòng KD nước' },
            { value: 35, label: 'Phòng Hành chính' },
        ];
    }

    getPositionRoomOptions() {
        return [
            { value: 1, label: 'Nhân viên' }, { value: 2, label: 'Phụ trách' }, { value: 3, label: 'Trưởng phòng' },
            { value: 4, label: 'Giám đốc' }, { value: 5, label: 'Học việc' }, { value: 6, label: 'Kiêm nhiệm' },
            { value: 7, label: 'GS học việc' }, { value: 8, label: 'Đội trưởng' }, { value: 9, label: 'Thực tập sinh' },
        ];
    }

    getSalaryMethodOptions() {
        return [
            { value: 1, label: 'Viettel Pay' }, { value: 2, label: 'Chuyển khoản' }, { value: 3, label: 'Tiền mặt' },
        ];
    }

    getAllDropdownOptions() {
        return {
            countries: this.getCountryOptions(),
            nations: this.getNationOptions(),
            religions: this.getReligionOptions(),
            educations: this.getEducationOptions(),
            maritals: this.getMaritalOptions(),
            contractTypes: this.getContractTypeOptions(),
            workRooms: this.getWorkRoomOptions(),
            positionRooms: this.getPositionRoomOptions(),
            salaryMethods: this.getSalaryMethodOptions(),
        };
    }
}
