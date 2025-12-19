import { Repository } from 'typeorm';
import { Ward } from '../../database/entities';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
export declare class WardsService {
    private readonly wardRepository;
    constructor(wardRepository: Repository<Ward>);
    findAll(query?: {
        provinceId?: number;
        districtId?: number;
        status?: number;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Ward[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Ward>;
    create(createWardDto: CreateWardDto, userId: number): Promise<Ward>;
    update(id: number, updateWardDto: UpdateWardDto): Promise<Ward>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getByDistrict(districtId: number): Promise<Ward[]>;
    private generateNameVi;
}
