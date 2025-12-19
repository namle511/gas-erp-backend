import { Repository } from 'typeorm';
import { Menu } from '../../database/entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
interface FindAllParams {
    showInMenu?: number;
    parentId?: number;
    search?: string;
    page?: number;
    limit?: number;
}
export declare class MenusService {
    private menuRepository;
    constructor(menuRepository: Repository<Menu>);
    findAll(params: FindAllParams): Promise<{
        data: Menu[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Menu>;
    create(createDto: CreateMenuDto): Promise<Menu>;
    update(id: number, updateDto: UpdateMenuDto): Promise<Menu>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getMenuTree(): Promise<any[]>;
    getParentMenus(): Promise<Menu[]>;
}
export {};
