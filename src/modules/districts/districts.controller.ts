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
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser {
    user: { userId: number; username: string; roleId: number };
}

@Controller('districts')
export class DistrictsController {
    constructor(private readonly districtsService: DistrictsService) { }

    @Get()
    findAll(
        @Query('provinceId') provinceId?: string,
        @Query('status') status?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.districtsService.findAll({
            provinceId: provinceId ? parseInt(provinceId) : undefined,
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get('by-province/:provinceId')
    getByProvince(@Param('provinceId', ParseIntPipe) provinceId: number) {
        return this.districtsService.getByProvince(provinceId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.districtsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createDistrictDto: CreateDistrictDto, @Request() req: RequestWithUser) {
        return this.districtsService.create(createDistrictDto, req.user.userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDistrictDto: UpdateDistrictDto,
    ) {
        return this.districtsService.update(id, updateDistrictDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.districtsService.remove(id);
    }
}
