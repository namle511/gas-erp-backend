import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
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

@Injectable()
export class MenusService {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
    ) { }

    async findAll(params: FindAllParams) {
        const { showInMenu, parentId, search, page = 1, limit = 50 } = params;

        const queryBuilder = this.menuRepository.createQueryBuilder('m');

        if (showInMenu !== undefined) {
            queryBuilder.andWhere('m.show_in_menu = :showInMenu', { showInMenu });
        }

        if (parentId !== undefined) {
            queryBuilder.andWhere('m.parent_id = :parentId', { parentId });
        }

        if (search) {
            queryBuilder.andWhere('m.menu_name LIKE :search', { search: `%${search}%` });
        }

        queryBuilder.orderBy('m.display_order', 'ASC').addOrderBy('m.id', 'ASC');

        const total = await queryBuilder.getCount();
        const data = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number) {
        const menu = await this.menuRepository.findOne({
            where: { id },
            relations: ['children'],
        });

        if (!menu) {
            throw new NotFoundException(`Menu với ID ${id} không tồn tại`);
        }

        return menu;
    }

    async create(createDto: CreateMenuDto) {
        const menu = this.menuRepository.create({
            ...createDto,
            type: createDto.type ?? 1,
            displayOrder: createDto.displayOrder ?? 1,
            showInMenu: createDto.showInMenu ?? 1,
            placeHolderId: createDto.placeHolderId ?? 1,
            applicationId: createDto.applicationId ?? 1,
            parentId: createDto.parentId ?? 0,
        });

        return this.menuRepository.save(menu);
    }

    async update(id: number, updateDto: UpdateMenuDto) {
        const menu = await this.findOne(id);
        Object.assign(menu, updateDto);
        return this.menuRepository.save(menu);
    }

    async remove(id: number) {
        const menu = await this.findOne(id);
        await this.menuRepository.remove(menu);
        return { message: 'Đã xóa menu thành công' };
    }

    // Get hierarchical menu tree
    async getMenuTree() {
        const allMenus = await this.menuRepository.find({
            where: { showInMenu: 1 },
            order: { displayOrder: 'ASC', id: 'ASC' },
        });

        // Build tree
        const menuMap = new Map<number, any>();
        const roots: any[] = [];

        allMenus.forEach((menu) => {
            menuMap.set(menu.id, { ...menu, children: [] });
        });

        allMenus.forEach((menu) => {
            const menuNode = menuMap.get(menu.id);
            if (menu.parentId === 0 || !menuMap.has(menu.parentId)) {
                roots.push(menuNode);
            } else {
                const parent = menuMap.get(menu.parentId);
                if (parent) {
                    parent.children.push(menuNode);
                }
            }
        });

        return roots;
    }

    // Get parent menus for dropdown
    async getParentMenus() {
        return this.menuRepository.find({
            where: { parentId: 0 },
            select: ['id', 'menuName'],
            order: { displayOrder: 'ASC', menuName: 'ASC' },
        });
    }
}
