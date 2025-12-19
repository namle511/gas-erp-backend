import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { SellsService } from './sells.service';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sells')
@UseGuards(JwtAuthGuard)
export class SellsController {
    constructor(private readonly sellsService: SellsService) { }

    @Get('dropdowns')
    getDropdowns() {
        return this.sellsService.getDropdowns();
    }

    @Get('report')
    getReport(
        @Query('groupBy') groupBy: 'agent' | 'material' | 'creator' | 'province' = 'agent',
        @Query('dateFrom') dateFrom?: string,
        @Query('dateTo') dateTo?: string,
        @Query('status') status?: string,
    ) {
        return this.sellsService.getReport({
            groupBy,
            dateFrom,
            dateTo,
            status: status ? parseInt(status, 10) : undefined,
        });
    }

    @Get('dashboard')
    getDashboard(
        @Query('dateFrom') dateFrom?: string,
        @Query('dateTo') dateTo?: string,
        @Query('provinceId') provinceId?: string,
        @Query('agentId') agentId?: string,
        @Query('materialId') materialId?: string,
        @Query('status') status?: string,
    ) {
        return this.sellsService.getDashboard({
            dateFrom,
            dateTo,
            provinceId: provinceId ? parseInt(provinceId, 10) : undefined,
            agentId: agentId ? parseInt(agentId, 10) : undefined,
            materialId: materialId ? parseInt(materialId, 10) : undefined,
            status: status ? parseInt(status, 10) : undefined,
        });
    }

    @Get()
    findAll(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('status') status?: string,
        @Query('orderType') orderType?: string,
        @Query('source') source?: string,
        @Query('agentId') agentId?: string,
        @Query('customerId') customerId?: string,
        @Query('dateFrom') dateFrom?: string,
        @Query('dateTo') dateTo?: string,
        @Query('codeNo') codeNo?: string,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    ) {
        return this.sellsService.findAll({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 20,
            status: status ? parseInt(status, 10) : undefined,
            orderType: orderType ? parseInt(orderType, 10) : undefined,
            source: source ? parseInt(source, 10) : undefined,
            agentId: agentId ? parseInt(agentId, 10) : undefined,
            customerId: customerId ? parseInt(customerId, 10) : undefined,
            dateFrom,
            dateTo,
            codeNo,
            sortBy: sortBy || 'id',
            sortOrder: sortOrder || 'DESC',
        });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sellsService.findOne(id);
    }

    @Post()
    create(@Body() createSellDto: CreateSellDto, @Request() req: any) {
        return this.sellsService.create(createSellDto, req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSellDto: UpdateSellDto,
        @Request() req: any,
    ) {
        return this.sellsService.update(id, updateSellDto, req.user.userId);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ParseIntPipe) status: number,
        @Body('statusCancel') statusCancel: number,
        @Request() req: any,
    ) {
        return this.sellsService.updateStatus(id, status, req.user.userId, statusCancel);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.sellsService.remove(id);
    }
}
