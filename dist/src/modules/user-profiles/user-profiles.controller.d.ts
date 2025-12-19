import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
export declare class UserProfilesController {
    private readonly userProfilesService;
    constructor(userProfilesService: UserProfilesService);
    getDropdowns(): {
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
    findByUserId(userId: number): Promise<import("../../database/entities").UserProfile | null>;
    findOne(id: number): Promise<import("../../database/entities").UserProfile>;
    create(createDto: CreateUserProfileDto): Promise<import("../../database/entities").UserProfile>;
    update(id: number, updateDto: UpdateUserProfileDto): Promise<import("../../database/entities").UserProfile>;
    upsertByUserId(userId: number, updateDto: UpdateUserProfileDto): Promise<import("../../database/entities").UserProfile>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
