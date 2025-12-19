import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEmail, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Profile data that can be sent with user create/update
export class UserProfileDataDto {
    @IsNumber() @IsOptional() countryId?: number;
    @IsNumber() @IsOptional() typeNation?: number;
    @IsNumber() @IsOptional() typeReligion?: number;
    @IsNumber() @IsOptional() typeEducation?: number;
    @IsString() @IsOptional() idNumber?: string;
    @IsNumber() @IsOptional() idProvince?: number;
    @IsString() @IsOptional() idCreatedDate?: string;
    @IsNumber() @IsOptional() statusMarital?: number;
    @IsString() @IsOptional() dateBeginJob?: string;
    @IsNumber() @IsOptional() contractType?: number;
    @IsString() @IsOptional() contractBegin?: string;
    @IsString() @IsOptional() contractEnd?: string;
    @IsNumber() @IsOptional() positionWork?: number;
    @IsNumber() @IsOptional() positionRoom?: number;
    @IsString() @IsOptional() leaveDate?: string;
    @IsNumber() @IsOptional() baseSalary?: number;
    @IsNumber() @IsOptional() bankId?: number;
    @IsString() @IsOptional() bankNo?: string;
    @IsString() @IsOptional() bankBranch?: string;
    @IsString() @IsOptional() socialInsuranceNo?: string;
    @IsString() @IsOptional() taxNo?: string;
    @IsNumber() @IsOptional() salaryMethod?: number;
}

export class CreateUserDto {
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

    @IsNumber({}, { message: 'Loại nhân sự phải là số' })
    @IsNotEmpty({ message: 'Vui lòng chọn loại nhân sự' })
    roleId: number;

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
    streetId?: number;

    @IsNumber()
    @IsOptional()
    status?: number;

    // Nested profile data - optional
    @ValidateNested()
    @Type(() => UserProfileDataDto)
    @IsOptional()
    profile?: UserProfileDataDto;
}
