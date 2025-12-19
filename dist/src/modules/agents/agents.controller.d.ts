import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
interface RequestWithUser {
    user: {
        userId: number;
        username: string;
        roleId: number;
    };
}
export declare class AgentsController {
    private readonly agentsService;
    constructor(agentsService: AgentsService);
    findAll(status?: string, provinceId?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities").User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<import("../../database/entities").User>;
    create(createAgentDto: CreateAgentDto, req: RequestWithUser): Promise<import("../../database/entities").User>;
    update(id: number, updateAgentDto: UpdateAgentDto): Promise<import("../../database/entities").User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
