import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEmail, MinLength } from 'class-validator';

export class CreateAgentDto {
    @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên đăng nhập' })
    username: string;

    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Vui lòng nhập email' })
    email: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;

    @IsString({ message: 'Họ tên phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập họ tên' })
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    nameAgent?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

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
    status?: number;
}
