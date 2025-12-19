import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
interface RequestWithUser {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class DistrictsController {
    private readonly districtsService;
    constructor(districtsService: DistrictsService);
    findAll(provinceId?: string, status?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities").District[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getByProvince(provinceId: number): Promise<import("../../database/entities").District[]>;
    findOne(id: number): Promise<import("../../database/entities").District>;
    create(createDistrictDto: CreateDistrictDto, req: RequestWithUser): Promise<import("../../database/entities").District>;
    update(id: number, updateDistrictDto: UpdateDistrictDto): Promise<import("../../database/entities").District>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
