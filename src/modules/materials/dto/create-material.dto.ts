import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength } from 'class-validator';

export class CreateMaterialDto {
    @IsString({ message: 'Mã vật tư phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập mã vật tư' })
    @MaxLength(20)
    materialsNo: string;

    @IsString({ message: 'Tên vật tư phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên vật tư' })
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    unit?: string;

    @IsNumber()
    @IsOptional()
    materialsTypeId?: number;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    displayOrder?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsNumber()
    @IsOptional()
    parentId?: number;

    @IsNumber()
    @IsOptional()
    status?: number;

    // Tên hiển thị trên thẻ kho
    @IsString()
    @IsOptional()
    nameStoreCard?: string;

    // Tên hiển thị trên hóa đơn
    @IsString()
    @IsOptional()
    nameInvoice?: string;

    // Có thuế không (1: Có, 2: Không)
    @IsNumber()
    @IsOptional()
    isTax?: number;

    // Tài khoản kế toán
    @IsString()
    @IsOptional()
    @MaxLength(22)
    suppliesAccount?: string;

    @IsString()
    @IsOptional()
    @MaxLength(22)
    costPriceAccount?: string;

    @IsString()
    @IsOptional()
    @MaxLength(22)
    revenueAccount?: string;

    @IsString()
    @IsOptional()
    @MaxLength(22)
    discountAccount?: string;
}
