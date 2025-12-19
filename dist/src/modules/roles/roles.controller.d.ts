import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(status?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities").Role[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<import("../../database/entities").Role>;
    create(createRoleDto: CreateRoleDto): Promise<import("../../database/entities").Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<import("../../database/entities").Role>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
