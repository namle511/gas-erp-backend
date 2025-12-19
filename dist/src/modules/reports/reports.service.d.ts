import { Repository } from 'typeorm';
import { User } from '../../database/entities';
import { UserProfile } from '../../database/entities/user-profile.entity';
export declare class ReportsService {
    private readonly userRepository;
    private readonly profileRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<UserProfile>);
    getStaffMovement(dateFrom: string, dateTo: string): Promise<{
        data: {
            month: string;
            monthLabel: string;
            join: number;
            leave: number;
            net: number;
        }[];
        totals: {
            join: number;
            leave: number;
            net: number;
        };
    }>;
    private formatMonthLabel;
    private getPositionWorkLabel;
    getStaffMovementByDepartment(dateFrom: string, dateTo: string): Promise<{
        data: {
            positionWork: number;
            name: string;
            join: number;
            leave: number;
            net: number;
            months: {
                month: string;
                monthLabel: string;
                join: number;
                leave: number;
            }[];
        }[];
        totals: {
            join: number;
            leave: number;
            net: number;
        };
    }>;
    getStaffMovementDetails(month: string, type: 'join' | 'leave', positionWork?: number): Promise<any>;
}
