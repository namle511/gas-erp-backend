import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellsService } from './sells.service';
import { SellsController } from './sells.controller';
import { Sell } from '../../database/entities/sell.entity';
import { SellDetail } from '../../database/entities/sell-detail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sell, SellDetail])],
    controllers: [SellsController],
    providers: [SellsService],
    exports: [SellsService],
})
export class SellsModule { }
