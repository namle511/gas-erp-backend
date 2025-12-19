import { StreetsService } from './streets.service';
import { CreateStreetDto } from './dto/create-street.dto';
import { UpdateStreetDto } from './dto/update-street.dto';
interface RequestWithUser {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class StreetsController {
    private readonly streetsService;
    constructor(streetsService: StreetsService);
    findAll(provinceId?: string, status?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities").Street[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    search(keyword: string): Promise<import("../../database/entities").Street[]>;
    findByProvince(provinceId: number): Promise<import("../../database/entities").Street[]>;
    findOne(id: number): Promise<import("../../database/entities").Street>;
    create(createStreetDto: CreateStreetDto, req: RequestWithUser): Promise<import("../../database/entities").Street>;
    update(id: number, updateStreetDto: UpdateStreetDto): Promise<import("../../database/entities").Street>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
