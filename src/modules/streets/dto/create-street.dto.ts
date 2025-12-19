import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateStreetDto {
    @IsString({ message: 'Tên đường phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên đường' })
    name: string;

    @IsNumber({}, { message: 'Tỉnh/Thành phố phải là số' })
    @IsOptional()
    provinceId?: number;

    @IsNumber({}, { message: 'Trạng thái phải là số' })
    @IsOptional()
    status?: number;
}
