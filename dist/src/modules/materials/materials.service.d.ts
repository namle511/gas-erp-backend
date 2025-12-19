import { Repository } from 'typeorm';
import { Material, MaterialType } from '../../database/entities';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export declare class MaterialsService {
    private readonly materialRepository;
    private readonly materialTypeRepository;
    constructor(materialRepository: Repository<Material>, materialTypeRepository: Repository<MaterialType>);
    findAll(query?: {
        materialsTypeId?: number;
        status?: number;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Material[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Material>;
    create(createMaterialDto: CreateMaterialDto, createdBy: number): Promise<Material>;
    update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<Material>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getMaterialTypes(): Promise<MaterialType[]>;
    getDropdownList(): Promise<Material[]>;
    private generateNameVi;
}
