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
import { StreetsService } from './streets.service';
import { CreateStreetDto } from './dto/create-street.dto';
import { UpdateStreetDto } from './dto/update-street.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser {
    user: { userId: number; username: string; roleId: number };
}

@Controller('streets')
export class StreetsController {
    constructor(private readonly streetsService: StreetsService) { }

    @Get()
    findAll(
        @Query('provinceId') provinceId?: string,
        @Query('status') status?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.streetsService.findAll({
            provinceId: provinceId ? parseInt(provinceId) : undefined,
            status: status ? parseInt(status) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get('search')
    search(@Query('keyword') keyword: string) {
        return this.streetsService.search(keyword);
    }

    @Get('province/:provinceId')
    findByProvince(@Param('provinceId', ParseIntPipe) provinceId: number) {
        return this.streetsService.findByProvince(provinceId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.streetsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createStreetDto: CreateStreetDto, @Request() req: RequestWithUser) {
        return this.streetsService.create(createStreetDto, req.user.userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStreetDto: UpdateStreetDto,
    ) {
        return this.streetsService.update(id, updateStreetDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.streetsService.remove(id);
    }
}
