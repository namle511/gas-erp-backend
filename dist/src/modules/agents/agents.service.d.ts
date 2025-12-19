import { Repository } from 'typeorm';
import { User, Role } from '../../database/entities';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
export declare class AgentsService {
    private readonly userRepository;
    private readonly roleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>);
    findAll(query?: {
        status?: number;
        provinceId?: number;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<User>;
    create(createAgentDto: CreateAgentDto, createdBy: number): Promise<User>;
    update(id: number, updateAgentDto: UpdateAgentDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
