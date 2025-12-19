import { IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateMaterialTypeDto {
    @IsNotEmpty({ message: 'Tên loại vật tư không được để trống' })
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    status?: number;

    @IsOptional()
    @IsNumber()
    groupType?: number;

    @IsOptional()
    @IsString()
    @MaxLength(22)
    suppliesAccount?: string;

    @IsOptional()
    @IsString()
    @MaxLength(22)
    costPriceAccount?: string;

    @IsOptional()
    @IsString()
    @MaxLength(22)
    revenueAccount?: string;

    @IsOptional()
    @IsString()
    @MaxLength(22)
    discountAccount?: string;

    @IsOptional()
    @IsString()
    @MaxLength(22)
    returnedAccount?: string;

    @IsOptional()
    @IsString()
    linkContent?: string;
}
