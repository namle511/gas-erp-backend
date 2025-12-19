import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    findAll(showInMenu?: string, parentId?: string, search?: string, page?: string, limit?: string): Promise<{
        data: import("../../database/entities/menu.entity").Menu[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getMenuTree(): Promise<any[]>;
    getParentMenus(): Promise<import("../../database/entities/menu.entity").Menu[]>;
    findOne(id: number): Promise<import("../../database/entities/menu.entity").Menu>;
    create(createDto: CreateMenuDto): Promise<import("../../database/entities/menu.entity").Menu>;
    update(id: number, updateDto: UpdateMenuDto): Promise<import("../../database/entities/menu.entity").Menu>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
