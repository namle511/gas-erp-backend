import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('staff-movement')
    async getStaffMovement(
        @Query('dateFrom') dateFrom: string,
        @Query('dateTo') dateTo: string,
    ) {
        const now = new Date();
        const defaultFrom = `${now.getFullYear()}-01-01`;
        const defaultTo = now.toISOString().split('T')[0];

        return this.reportsService.getStaffMovement(
            dateFrom || defaultFrom,
            dateTo || defaultTo,
        );
    }

    @Get('staff-movement-by-department')
    async getStaffMovementByDepartment(
        @Query('dateFrom') dateFrom: string,
        @Query('dateTo') dateTo: string,
    ) {
        const now = new Date();
        const defaultFrom = `${now.getFullYear()}-01-01`;
        const defaultTo = now.toISOString().split('T')[0];

        return this.reportsService.getStaffMovementByDepartment(
            dateFrom || defaultFrom,
            dateTo || defaultTo,
        );
    }

    @Get('staff-movement-details')
    async getStaffMovementDetails(
        @Query('month') month: string,
        @Query('type') type: 'join' | 'leave',
        @Query('positionWork') positionWork?: string,
    ) {
        return this.reportsService.getStaffMovementDetails(
            month,
            type,
            positionWork ? parseInt(positionWork, 10) : undefined,
        );
    }
}
