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
import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser {
    user: { userId: number; username: string; roleId: number };
}

@Controller('wards')
export class WardsController {
    constructor(private readonly wardsService: WardsService) { }

    @Get()
    findAll(
        @Query('provinceId') provinceId?: string,
        @Query('districtId') districtId?: string,
        @Query('status') status?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.wardsService.findAll({
            provinceId: provinceId ? parseInt(provinceId) : undefined,
            districtId: districtId ? parseInt(districtId) : undefined,
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get('by-district/:districtId')
    getByDistrict(@Param('districtId', ParseIntPipe) districtId: number) {
        return this.wardsService.getByDistrict(districtId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.wardsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createWardDto: CreateWardDto, @Request() req: RequestWithUser) {
        return this.wardsService.create(createWardDto, req.user.userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWardDto: UpdateWardDto,
    ) {
        return this.wardsService.update(id, updateWardDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.wardsService.remove(id);
    }
}
