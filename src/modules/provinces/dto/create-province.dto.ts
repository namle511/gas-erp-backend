import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateProvinceDto {
    @IsString({ message: 'Tên tỉnh/thành phố phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên tỉnh/thành phố' })
    name: string;

    @IsString({ message: 'Tên viết tắt phải là chuỗi' })
    @IsOptional()
    shortName?: string;

    @IsNumber({}, { message: 'Trạng thái phải là số' })
    @IsOptional()
    status?: number;

    @IsNumber({}, { message: 'Thứ tự hiển thị phải là số' })
    @IsOptional()
    @Min(0)
    @Max(255)
    displayOrder?: number;
}
