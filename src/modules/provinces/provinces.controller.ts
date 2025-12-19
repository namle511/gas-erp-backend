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
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('provinces')
export class ProvincesController {
    constructor(private readonly provincesService: ProvincesService) { }

    @Get()
    findAll(
        @Query('status') status?: string,
        @Query('search') search?: string,
    ) {
        return this.provincesService.findAll({
            status: status ? parseInt(status) : undefined,
            search,
        });
    }

    @Get('dropdown')
    getDropdownList() {
        return this.provincesService.getDropdownList();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.provincesService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createProvinceDto: CreateProvinceDto) {
        return this.provincesService.create(createProvinceDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProvinceDto: UpdateProvinceDto,
    ) {
        return this.provincesService.update(id, updateProvinceDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.provincesService.remove(id);
    }
}
