import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateWardDto {
    @IsNumber({}, { message: 'Tỉnh/Thành phố phải là số' })
    @IsNotEmpty({ message: 'Vui lòng chọn tỉnh/thành phố' })
    provinceId: number;

    @IsNumber({}, { message: 'Quận/Huyện phải là số' })
    @IsNotEmpty({ message: 'Vui lòng chọn quận/huyện' })
    districtId: number;

    @IsString({ message: 'Tên phường/xã phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên phường/xã' })
    name: string;

    @IsNumber({}, { message: 'Trạng thái phải là số' })
    @IsOptional()
    status?: number;
}
