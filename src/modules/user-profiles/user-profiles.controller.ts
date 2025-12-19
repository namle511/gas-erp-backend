import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user-profiles')
@UseGuards(JwtAuthGuard)
export class UserProfilesController {
    constructor(private readonly userProfilesService: UserProfilesService) { }

    @Get('dropdowns')
    getDropdowns() {
        return this.userProfilesService.getAllDropdownOptions();
    }

    @Get('user/:userId')
    findByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.userProfilesService.findByUserId(userId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userProfilesService.findOne(id);
    }

    @Post()
    create(@Body() createDto: CreateUserProfileDto) {
        return this.userProfilesService.create(createDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateUserProfileDto,
    ) {
        return this.userProfilesService.update(id, updateDto);
    }

    @Patch('user/:userId')
    upsertByUserId(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() updateDto: UpdateUserProfileDto,
    ) {
        return this.userProfilesService.upsertByUserId(userId, updateDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userProfilesService.remove(id);
    }
}
