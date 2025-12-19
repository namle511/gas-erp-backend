"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_profile_entity_1 = require("../../database/entities/user-profile.entity");
let UserProfilesService = class UserProfilesService {
    profileRepository;
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async findByUserId(userId) {
        console.log('Finding profile for userId:', userId);
        const profile = await this.profileRepository.findOne({
            where: { userId },
        });
        console.log('Found profile:', profile ? profile.id : 'null');
        return profile;
    }
    async findOne(id) {
        const profile = await this.profileRepository.findOne({ where: { id } });
        if (!profile) {
            throw new common_1.NotFoundException(`Không tìm thấy hồ sơ với ID ${id}`);
        }
        return profile;
    }
    async create(dto) {
        const profile = this.profileRepository.create({
            ...dto,
            type: dto.type ?? 1,
        });
        return this.profileRepository.save(profile);
    }
    async update(id, dto) {
        const profile = await this.findOne(id);
        Object.assign(profile, dto);
        return this.profileRepository.save(profile);
    }
    async upsertByUserId(userId, dto) {
        let profile = await this.findByUserId(userId);
        if (profile) {
            Object.assign(profile, dto);
            return this.profileRepository.save(profile);
        }
        else {
            const newProfile = this.profileRepository.create({
                ...dto,
                userId,
                type: 1,
            });
            return this.profileRepository.save(newProfile);
        }
    }
    async remove(id) {
        const profile = await this.findOne(id);
        await this.profileRepository.remove(profile);
        return { message: 'Đã xóa hồ sơ thành công' };
    }
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
};
exports.UserProfilesService = UserProfilesService;
exports.UserProfilesService = UserProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserProfilesService);
//# sourceMappingURL=user-profiles.service.js.map