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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser {
    user: { userId: number; username: string; roleId: number };
}

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get()
    findAll(
        @Query('roleId') roleId?: string,
        @Query('type') type?: string,
        @Query('status') status?: string,
        @Query('provinceId') provinceId?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.customersService.findAll({
            roleId: roleId ? parseInt(roleId) : undefined,
            type: type ? parseInt(type) : undefined,
            status: status ? parseInt(status) : undefined,
            provinceId: provinceId ? parseInt(provinceId) : undefined,
            search,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get('types')
    getCustomerTypes() {
        return this.customersService.getCustomerTypes();
    }

    @Get('search-hgd')
    searchHgd(
        @Query('term') term?: string,
        @Query('customerType') customerType?: string,
        @Query('agentId') agentId?: string,
        @Query('limit') limit?: string,
    ) {
        return this.customersService.searchHgd({
            term,
            customerType,
            agentId: agentId ? parseInt(agentId) : undefined,
            limit: limit ? parseInt(limit) : 20,
        });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.findOne(id);
    }

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto, @Request() req: RequestWithUser) {
        return this.customersService.create(createCustomerDto, req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return this.customersService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.remove(id);
    }
}
