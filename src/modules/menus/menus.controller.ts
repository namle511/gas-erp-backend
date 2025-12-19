import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) { }

    @Get()
    findAll(
        @Query('showInMenu') showInMenu?: string,
        @Query('parentId') parentId?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.menusService.findAll({
            showInMenu: showInMenu ? parseInt(showInMenu) : undefined,
            parentId: parentId ? parseInt(parentId) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 50,
        });
    }

    @Get('tree')
    getMenuTree() {
        return this.menusService.getMenuTree();
    }

    @Get('parents')
    getParentMenus() {
        return this.menusService.getParentMenus();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.menusService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createDto: CreateMenuDto) {
        return this.menusService.create(createDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateMenuDto,
    ) {
        return this.menusService.update(id, updateDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.menusService.remove(id);
    }
}
