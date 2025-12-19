import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreetsService } from './streets.service';
import { StreetsController } from './streets.controller';
import { Street } from '../../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Street])],
    controllers: [StreetsController],
    providers: [StreetsService],
    exports: [StreetsService],
})
export class StreetsModule { }
