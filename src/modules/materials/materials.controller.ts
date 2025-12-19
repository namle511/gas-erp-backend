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
    Request,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser {
    user: { userId: number; username: string; roleId: number };
}

@Controller('materials')
export class MaterialsController {
    constructor(private readonly materialsService: MaterialsService) { }

    @Get()
    findAll(
        @Query('materialsTypeId') materialsTypeId?: string,
        @Query('status') status?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.materialsService.findAll({
            materialsTypeId: materialsTypeId ? parseInt(materialsTypeId) : undefined,
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get('types')
    getMaterialTypes() {
        return this.materialsService.getMaterialTypes();
    }

    @Get('dropdown')
    getDropdownList() {
        return this.materialsService.getDropdownList();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.materialsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createMaterialDto: CreateMaterialDto, @Request() req: RequestWithUser) {
        return this.materialsService.create(createMaterialDto, req.user.userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMaterialDto: UpdateMaterialDto,
    ) {
        return this.materialsService.update(id, updateMaterialDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.materialsService.remove(id);
    }
}
