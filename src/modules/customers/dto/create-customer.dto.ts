import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCustomerDto {
    @IsString({ message: 'Tên khách hàng phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên khách hàng' })
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    houseNumbers?: string;

    @IsNumber()
    @IsOptional()
    provinceId?: number;

    @IsNumber()
    @IsOptional()
    districtId?: number;

    @IsNumber()
    @IsOptional()
    wardId?: number;

    @IsNumber()
    @IsOptional()
    streetId?: number;

    @IsNumber()
    @IsOptional()
    roleId?: number;

    @IsNumber()
    @IsOptional()
    type?: number;

    @IsNumber()
    @IsOptional()
    isMaintain?: number;

    @IsNumber()
    @IsOptional()
    agentId?: number;

    @IsNumber()
    @IsOptional()
    saleId?: number;

    @IsNumber()
    @IsOptional()
    paymentDay?: number;

    @IsString()
    @IsOptional()
    codeBusiness?: string;

    @IsNumber()
    @IsOptional()
    status?: number;
}
