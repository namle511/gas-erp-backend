import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { User } from '../../database/entities';
import { UserProfile } from '../../database/entities/user-profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserProfile])],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule { }
