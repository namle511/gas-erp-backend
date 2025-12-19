import { MaterialTypesService } from './material-types.service';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
export declare class MaterialTypesController {
    private readonly materialTypesService;
    constructor(materialTypesService: MaterialTypesService);
    findAll(status?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities").MaterialType[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getDropdownList(): Promise<import("../../database/entities").MaterialType[]>;
    findOne(id: number): Promise<import("../../database/entities").MaterialType>;
    create(createDto: CreateMaterialTypeDto): Promise<import("../../database/entities").MaterialType>;
    update(id: number, updateDto: UpdateMaterialTypeDto): Promise<import("../../database/entities").MaterialType>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
