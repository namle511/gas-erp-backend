import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
interface RequestWithUser {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    findAll(materialsTypeId?: string, status?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities").Material[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getMaterialTypes(): Promise<import("../../database/entities").MaterialType[]>;
    getDropdownList(): Promise<import("../../database/entities").Material[]>;
    findOne(id: number): Promise<import("../../database/entities").Material>;
    create(createMaterialDto: CreateMaterialDto, req: RequestWithUser): Promise<import("../../database/entities").Material>;
    update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<import("../../database/entities").Material>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
