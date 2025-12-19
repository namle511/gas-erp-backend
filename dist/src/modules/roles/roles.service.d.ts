import { Repository } from 'typeorm';
import { Role } from '../../database/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    findAll(query?: {
        status?: number;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Role[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Role>;
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
