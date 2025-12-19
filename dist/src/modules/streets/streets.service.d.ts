import { Repository } from 'typeorm';
import { Street } from '../../database/entities';
import { CreateStreetDto } from './dto/create-street.dto';
import { UpdateStreetDto } from './dto/update-street.dto';
export declare class StreetsService {
    private readonly streetRepository;
    constructor(streetRepository: Repository<Street>);
    findAll(query?: {
        provinceId?: number;
        status?: number;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Street[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Street>;
    create(createStreetDto: CreateStreetDto, userId: number): Promise<Street>;
    update(id: number, updateStreetDto: UpdateStreetDto): Promise<Street>;
    remove(id: number): Promise<{
        message: string;
    }>;
    search(keyword: string): Promise<Street[]>;
    findByProvince(provinceId: number): Promise<Street[]>;
    private generateNameVi;
}
