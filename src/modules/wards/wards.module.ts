import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';
import { Ward } from '../../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Ward])],
    controllers: [WardsController],
    providers: [WardsService],
    exports: [WardsService],
})
export class WardsModule { }
