import { IsNumber, IsString, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSellDetailDto {
    @IsNumber()
    materialsId: number;

    @IsNumber()
    materialsParentId: number;

    @IsNumber()
    @IsOptional()
    materialsTypeId?: number;

    @IsNumber()
    qty: number;

    @IsNumber()
    price: number;

    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsNumber()
    @IsOptional()
    amountDiscount?: number;

    @IsNumber()
    @IsOptional()
    promotionAmount?: number;
}

export class CreateSellDto {
    @IsNumber()
    customerId: number;

    @IsNumber()
    agentId: number;

    @IsNumber()
    @IsOptional()
    saleId?: number;

    @IsNumber()
    @IsOptional()
    employeeMaintainId?: number;

    @IsNumber()
    @IsOptional()
    typeCustomer?: number;

    @IsNumber()
    @IsOptional()
    orderType?: number;

    @IsNumber()
    @IsOptional()
    source?: number;

    @IsNumber()
    @IsOptional()
    paymentType?: number;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    note?: string;

    @IsNumber()
    @IsOptional()
    provinceId?: number;

    @IsNumber()
    @IsOptional()
    amountDiscount?: number;

    @IsNumber()
    @IsOptional()
    promotionAmount?: number;

    @IsString()
    @IsOptional()
    createdDateOnly?: string;

    @IsDateString()
    @IsOptional()
    deliveryTimer?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSellDetailDto)
    details: CreateSellDetailDto[];
}
