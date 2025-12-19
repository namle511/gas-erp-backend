import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material, MaterialType } from '../../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Material, MaterialType])],
    controllers: [MaterialsController],
    providers: [MaterialsService],
    exports: [MaterialsService],
})
export class MaterialsModule { }
