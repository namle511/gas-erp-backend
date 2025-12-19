import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên đăng nhập' })
    username: string;

    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
    @MinLength(1, { message: 'Mật khẩu không được để trống' })
    password: string;
}
