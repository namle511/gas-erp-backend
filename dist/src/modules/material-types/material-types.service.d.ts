import { Repository } from 'typeorm';
import { MaterialType } from '../../database/entities/material-type.entity';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
interface FindAllParams {
    status?: number;
    search?: string;
    page?: number;
    limit?: number;
}
export declare class MaterialTypesService {
    private materialTypeRepository;
    constructor(materialTypeRepository: Repository<MaterialType>);
    findAll(params: FindAllParams): Promise<{
        data: MaterialType[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<MaterialType>;
    create(createDto: CreateMaterialTypeDto): Promise<MaterialType>;
    update(id: number, updateDto: UpdateMaterialTypeDto): Promise<MaterialType>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getDropdownList(): Promise<MaterialType[]>;
}
export {};
