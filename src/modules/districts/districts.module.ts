import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { District } from '../../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([District])],
    controllers: [DistrictsController],
    providers: [DistrictsService],
    exports: [DistrictsService],
})
export class DistrictsModule { }
