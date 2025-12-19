import { Repository } from 'typeorm';
import { UserProfile } from '../../database/entities/user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
export declare class UserProfilesService {
    private readonly profileRepository;
    constructor(profileRepository: Repository<UserProfile>);
    findByUserId(userId: number): Promise<UserProfile | null>;
    findOne(id: number): Promise<UserProfile>;
    create(dto: CreateUserProfileDto): Promise<UserProfile>;
    update(id: number, dto: UpdateUserProfileDto): Promise<UserProfile>;
    upsertByUserId(userId: number, dto: UpdateUserProfileDto): Promise<UserProfile>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getCountryOptions(): {
        value: number;
        label: string;
    }[];
    getNationOptions(): {
        value: number;
        label: string;
    }[];
    getReligionOptions(): {
        value: number;
        label: string;
    }[];
    getEducationOptions(): {
        value: number;
        label: string;
    }[];
    getMaritalOptions(): {
        value: number;
        label: string;
    }[];
    getContractTypeOptions(): {
        value: number;
        label: string;
    }[];
    getWorkRoomOptions(): {
        value: number;
        label: string;
    }[];
    getPositionRoomOptions(): {
        value: number;
        label: string;
    }[];
    getSalaryMethodOptions(): {
        value: number;
        label: string;
    }[];
    getAllDropdownOptions(): {
        countries: {
            value: number;
            label: string;
        }[];
        nations: {
            value: number;
            label: string;
        }[];
        religions: {
            value: number;
            label: string;
        }[];
        educations: {
            value: number;
            label: string;
        }[];
        maritals: {
            value: number;
            label: string;
        }[];
        contractTypes: {
            value: number;
            label: string;
        }[];
        workRooms: {
            value: number;
            label: string;
        }[];
        positionRooms: {
            value: number;
            label: string;
        }[];
        salaryMethods: {
            value: number;
            label: string;
        }[];
    };
}
