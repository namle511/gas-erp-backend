import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDistrictDto {
    @IsNumber({}, { message: 'Tỉnh/Thành phố phải là số' })
    @IsNotEmpty({ message: 'Vui lòng chọn tỉnh/thành phố' })
    provinceId: number;

    @IsString({ message: 'Tên quận/huyện phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên quận/huyện' })
    name: string;

    @IsNumber({}, { message: 'Trạng thái phải là số' })
    @IsOptional()
    status?: number;
}
