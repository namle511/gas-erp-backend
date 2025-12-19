import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, IsNull } from 'typeorm';
import { User } from '../../database/entities';
import { UserProfile } from '../../database/entities/user-profile.entity';

// Exclude customer (4) and agent (5) roles - but these are for users table, 
// profiles are typically for employees (role 2, 3, etc)
const EXCLUDED_ROLES = [4, 5];

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserProfile)
        private readonly profileRepository: Repository<UserProfile>,
    ) { }

    async getStaffMovement(dateFrom: string, dateTo: string) {
        // Use raw SQL with INNER JOIN to ensure orphan profiles are excluded
        const profiles = await this.profileRepository.query(`
            SELECT 
                p.date_begin_job as dateBeginJob,
                p.leave_date as leaveDate
            FROM gas_users_profile p
            INNER JOIN gas_users u ON u.id = p.user_id
            WHERE p.type = 1 AND p.date_begin_job IS NOT NULL
        `);

        // Parse date range
        const from = new Date(dateFrom);
        const to = new Date(dateTo);

        // Build monthly data
        const monthlyData: Map<string, { join: number; leave: number }> = new Map();

        // Initialize all months in range
        const current = new Date(from.getFullYear(), from.getMonth(), 1);
        const endMonth = new Date(to.getFullYear(), to.getMonth(), 1);
        while (current <= endMonth) {
            const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
            monthlyData.set(key, { join: 0, leave: 0 });
            current.setMonth(current.getMonth() + 1);
        }

        // Count joins and leaves
        for (const profile of profiles) {
            const user = profile.user;

            // Count joins (dateBeginJob in range)
            if (profile.dateBeginJob) {
                const joinDate = new Date(profile.dateBeginJob);
                if (joinDate >= from && joinDate <= to) {
                    const key = `${joinDate.getFullYear()}-${String(joinDate.getMonth() + 1).padStart(2, '0')}`;
                    const data = monthlyData.get(key);
                    if (data) data.join++;
                }
            }

            // Count leaves (leaveDate in range - anyone with leave_date is considered left)
            if (profile.leaveDate) {
                const leaveDate = new Date(profile.leaveDate);
                if (leaveDate >= from && leaveDate <= to) {
                    const key = `${leaveDate.getFullYear()}-${String(leaveDate.getMonth() + 1).padStart(2, '0')}`;
                    const data = monthlyData.get(key);
                    if (data) data.leave++;
                }
            }
        }

        // Convert to array sorted by month
        const result = Array.from(monthlyData.entries())
            .map(([month, data]) => ({
                month,
                monthLabel: this.formatMonthLabel(month),
                join: data.join,
                leave: data.leave,
                net: data.join - data.leave,
            }))
            .sort((a, b) => a.month.localeCompare(b.month));

        // Calculate totals
        const totals = result.reduce(
            (acc, item) => ({
                join: acc.join + item.join,
                leave: acc.leave + item.leave,
                net: acc.net + item.net,
            }),
            { join: 0, leave: 0, net: 0 }
        );

        return { data: result, totals };
    }

    private formatMonthLabel(month: string): string {
        const [year, m] = month.split('-');
        return `Tháng ${parseInt(m)}/${year}`;
    }

    // Position work labels from legacy UsersProfile::getArrWorkRoom()
    private getPositionWorkLabel(positionWork: number | null): string {
        const labels: Record<number, string> = {
            1: 'Ban giám đốc',
            2: 'PTTT',
            3: 'Phòng công nghệ',
            4: 'Phòng kế toán',
            5: 'Phòng kinh doanh',
            6: 'Phòng kỹ thuật',
            7: 'Phòng Marketing',
            8: 'Phòng pháp chế',
            9: 'Phòng tổng đài',
            10: 'Phòng vật tư',
            11: 'Trạm Bến Cát',
            12: 'Trạm Bình Định',
            13: 'Trạm Phước Tân',
            14: 'Trạm Vĩnh Long',
            15: 'Văn phòng',
            16: 'PVKH',
            17: 'Tài xế xe bồn',
            18: 'Tài xế xe bình',
            19: 'Phụ xe xe bình',
            20: 'Quản đốc',
            21: 'Công nhân',
            22: 'Giám sát',
            23: 'Bảo vệ',
            24: 'Tạp vụ',
            25: 'Phòng telesale',
            26: 'CCS',
            27: 'Bộ phận Xưởng',
            28: 'Phòng giặt sấy',
            29: 'Phòng KD thiết bị',
            30: 'Phòng nhân sự',
            31: 'Phòng KD nước',
            32: 'Giám đốc khu vực',
            33: 'Kinh doanh Pepsi',
            34: 'Công ty Techres',
            35: 'Phòng hành chính',
            36: 'KD sữa Friesland Campina',
        };
        return labels[positionWork ?? 0] || 'Khác';
    }

    async getStaffMovementByDepartment(dateFrom: string, dateTo: string) {
        // Use raw SQL with INNER JOIN to ensure orphan profiles are excluded
        const profiles = await this.profileRepository.query(`
            SELECT 
                p.position_work as positionWork,
                p.date_begin_job as dateBeginJob,
                p.leave_date as leaveDate
            FROM gas_users_profile p
            INNER JOIN gas_users u ON u.id = p.user_id
            WHERE p.type = 1 AND p.date_begin_job IS NOT NULL
        `);

        const from = new Date(dateFrom);
        const to = new Date(dateTo);

        // Group by department (positionWork)
        const deptData: Map<number, { name: string; join: number; leave: number; details: Map<string, { join: number; leave: number }> }> = new Map();

        for (const profile of profiles) {
            const positionWork = profile.positionWork ?? 0;

            if (!deptData.has(positionWork)) {
                deptData.set(positionWork, {
                    name: this.getPositionWorkLabel(positionWork),
                    join: 0,
                    leave: 0,
                    details: new Map(),
                });
            }
            const dept = deptData.get(positionWork)!;

            // Count joins
            if (profile.dateBeginJob) {
                const joinDate = new Date(profile.dateBeginJob);
                if (joinDate >= from && joinDate <= to) {
                    dept.join++;
                    const monthKey = `${joinDate.getFullYear()}-${String(joinDate.getMonth() + 1).padStart(2, '0')}`;
                    if (!dept.details.has(monthKey)) {
                        dept.details.set(monthKey, { join: 0, leave: 0 });
                    }
                    dept.details.get(monthKey)!.join++;
                }
            }

            // Count leaves
            if (profile.leaveDate) {
                const leaveDate = new Date(profile.leaveDate);
                if (leaveDate >= from && leaveDate <= to) {
                    dept.leave++;
                    const monthKey = `${leaveDate.getFullYear()}-${String(leaveDate.getMonth() + 1).padStart(2, '0')}`;
                    if (!dept.details.has(monthKey)) {
                        dept.details.set(monthKey, { join: 0, leave: 0 });
                    }
                    dept.details.get(monthKey)!.leave++;
                }
            }
        }

        // Convert to array
        const result = Array.from(deptData.entries())
            .map(([positionWork, data]) => ({
                positionWork,
                name: data.name,
                join: data.join,
                leave: data.leave,
                net: data.join - data.leave,
                months: Array.from(data.details.entries())
                    .map(([month, d]) => ({
                        month,
                        monthLabel: this.formatMonthLabel(month),
                        join: d.join,
                        leave: d.leave,
                    }))
                    .sort((a, b) => a.month.localeCompare(b.month)),
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

        const totals = result.reduce(
            (acc, item) => ({
                join: acc.join + item.join,
                leave: acc.leave + item.leave,
                net: acc.net + item.net,
            }),
            { join: 0, leave: 0, net: 0 }
        );

        return { data: result, totals };
    }

    // Get detailed employee list for a specific month using raw SQL
    async getStaffMovementDetails(month: string, type: 'join' | 'leave', positionWork?: number) {
        const [year, m] = month.split('-').map(Number);

        // Format dates directly without timezone conversion issues
        const startDateStr = `${year}-${String(m).padStart(2, '0')}-01`;
        const lastDay = new Date(year, m, 0).getDate(); // Get last day of month
        const endDateStr = `${year}-${String(m).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

        // Use raw query with INNER JOIN to only get profiles with valid users
        let sql = `
            SELECT 
                p.user_id as userId,
                p.position_work as positionWork,
                p.date_begin_job as dateBeginJob,
                p.leave_date as leaveDate,
                u.first_name as firstName,
                u.last_name as lastName,
                u.phone,
                u.email,
                u.username
            FROM gas_users_profile p
            INNER JOIN gas_users u ON u.id = p.user_id
            WHERE p.type = 1
        `;

        const params: any[] = [];

        if (type === 'join') {
            sql += ` AND p.date_begin_job >= ? AND p.date_begin_job <= ?`;
            params.push(startDateStr, endDateStr);
        } else {
            sql += ` AND p.leave_date >= ? AND p.leave_date <= ?`;
            params.push(startDateStr, endDateStr);
        }

        if (positionWork !== undefined && positionWork > 0) {
            sql += ` AND p.position_work = ?`;
            params.push(positionWork);
        }

        const results = await this.profileRepository.query(sql, params);

        return results.map((row: any) => ({
            id: row.userId,
            fullName: row.lastName || row.firstName
                ? `${row.lastName || ''} ${row.firstName || ''}`.trim()
                : row.username || `User #${row.userId}`,
            phone: row.phone || '',
            email: row.email || '',
            positionWork: row.positionWork,
            positionWorkName: this.getPositionWorkLabel(row.positionWork),
            dateBeginJob: row.dateBeginJob,
            leaveDate: row.leaveDate,
        }));
    }
}
