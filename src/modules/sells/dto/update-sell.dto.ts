import { PartialType } from '@nestjs/mapped-types';
import { CreateSellDto } from './create-sell.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateSellDto extends PartialType(CreateSellDto) {
    @IsNumber()
    @IsOptional()
    status?: number;

    @IsNumber()
    @IsOptional()
    statusCancel?: number;
}
