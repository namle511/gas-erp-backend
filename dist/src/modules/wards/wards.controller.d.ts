import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
interface RequestWithUser {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class WardsController {
    private readonly wardsService;
    constructor(wardsService: WardsService);
    findAll(provinceId?: string, districtId?: string, status?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities").Ward[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getByDistrict(districtId: number): Promise<import("../../database/entities").Ward[]>;
    findOne(id: number): Promise<import("../../database/entities").Ward>;
    create(createWardDto: CreateWardDto, req: RequestWithUser): Promise<import("../../database/entities").Ward>;
    update(id: number, updateWardDto: UpdateWardDto): Promise<import("../../database/entities").Ward>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
