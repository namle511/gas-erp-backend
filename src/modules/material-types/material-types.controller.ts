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
import { MaterialTypesService } from './material-types.service';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('material-types')
export class MaterialTypesController {
    constructor(private readonly materialTypesService: MaterialTypesService) { }

    @Get()
    findAll(
        @Query('status') status?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.materialTypesService.findAll({
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get('dropdown')
    getDropdownList() {
        return this.materialTypesService.getDropdownList();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.materialTypesService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createDto: CreateMaterialTypeDto) {
        return this.materialTypesService.create(createDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateMaterialTypeDto,
    ) {
        return this.materialTypesService.update(id, updateDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.materialTypesService.remove(id);
    }
}
