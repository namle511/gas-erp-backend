import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, Role } from '../../database/entities';
import { UserProfile } from '../../database/entities/user-profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, UserProfile])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
