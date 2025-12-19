import { Repository } from 'typeorm';
import { Province } from '../../database/entities';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
export declare class ProvincesService {
    private readonly provinceRepository;
    constructor(provinceRepository: Repository<Province>);
    findAll(query?: {
        status?: number;
        search?: string;
    }): Promise<Province[]>;
    findOne(id: number): Promise<Province>;
    create(createProvinceDto: CreateProvinceDto): Promise<Province>;
    update(id: number, updateProvinceDto: UpdateProvinceDto): Promise<Province>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getDropdownList(): Promise<Province[]>;
    private generateSlug;
}
