import { IsNumber, IsOptional, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// DTO cho việc hủy đơn hàng
export class DropOrderDto {
    @IsNumber()
    statusCancel: number; // Lý do hủy từ CancelReason
}

// DTO cho chi tiết vật tư khi hoàn thành
export class OrderDetailDto {
    @IsNumber()
    materialsId: number;

    @IsNumber()
    materialsTypeId: number;

    @IsNumber()
    qty: number;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    seri?: number;
}

// DTO cho việc hoàn thành đơn hàng
export class CompleteOrderDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDto)
    details?: OrderDetailDto[];

    @IsOptional()
    @IsNumber()
    promotionAmount?: number;

    @IsOptional()
    @IsString()
    ptttCode?: string; // Mã code PTTT (bình quay về)

    @IsOptional()
    @IsNumber()
    gasRemain?: number; // Gas dư (kg)

    @IsOptional()
    @IsNumber()
    gasRemainAmount?: number; // Tiền gas dư
}

// DTO cho params lấy danh sách đơn mobile
export class MobileOrdersQueryDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 20;

    @IsOptional()
    @IsString()
    tab?: 'new' | 'my' | 'completed' | 'cancelled';
}
