import { Repository } from 'typeorm';
import { District } from '../../database/entities';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
export declare class DistrictsService {
    private readonly districtRepository;
    constructor(districtRepository: Repository<District>);
    findAll(query?: {
        provinceId?: number;
        status?: number;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: District[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<District>;
    create(createDistrictDto: CreateDistrictDto, userId: number): Promise<District>;
    update(id: number, updateDistrictDto: UpdateDistrictDto): Promise<District>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getByProvince(provinceId: number): Promise<District[]>;
    private generateShortName;
}
