import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialType } from '../../database/entities/material-type.entity';
import { MaterialTypesController } from './material-types.controller';
import { MaterialTypesService } from './material-types.service';

@Module({
    imports: [TypeOrmModule.forFeature([MaterialType])],
    controllers: [MaterialTypesController],
    providers: [MaterialTypesService],
    exports: [MaterialTypesService],
})
export class MaterialTypesModule { }
