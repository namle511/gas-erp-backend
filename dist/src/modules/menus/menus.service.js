"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_entity_1 = require("../../database/entities/menu.entity");
let MenusService = class MenusService {
    menuRepository;
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
    }
    async findAll(params) {
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
    async findOne(id) {
        const menu = await this.menuRepository.findOne({
            where: { id },
            relations: ['children'],
        });
        if (!menu) {
            throw new common_1.NotFoundException(`Menu với ID ${id} không tồn tại`);
        }
        return menu;
    }
    async create(createDto) {
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
    async update(id, updateDto) {
        const menu = await this.findOne(id);
        Object.assign(menu, updateDto);
        return this.menuRepository.save(menu);
    }
    async remove(id) {
        const menu = await this.findOne(id);
        await this.menuRepository.remove(menu);
        return { message: 'Đã xóa menu thành công' };
    }
    async getMenuTree() {
        const allMenus = await this.menuRepository.find({
            where: { showInMenu: 1 },
            order: { displayOrder: 'ASC', id: 'ASC' },
        });
        const menuMap = new Map();
        const roots = [];
        allMenus.forEach((menu) => {
            menuMap.set(menu.id, { ...menu, children: [] });
        });
        allMenus.forEach((menu) => {
            const menuNode = menuMap.get(menu.id);
            if (menu.parentId === 0 || !menuMap.has(menu.parentId)) {
                roots.push(menuNode);
            }
            else {
                const parent = menuMap.get(menu.parentId);
                if (parent) {
                    parent.children.push(menuNode);
                }
            }
        });
        return roots;
    }
    async getParentMenus() {
        return this.menuRepository.find({
            where: { parentId: 0 },
            select: ['id', 'menuName'],
            order: { displayOrder: 'ASC', menuName: 'ASC' },
        });
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MenusService);
//# sourceMappingURL=menus.service.js.map