import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
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
    getStaffMovementDetails(month: string, type: 'join' | 'leave', positionWork?: string): Promise<any>;
}
