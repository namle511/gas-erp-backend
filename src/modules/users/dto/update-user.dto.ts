import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto, UserProfileDataDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password', 'profile'])) {
    @IsString({ message: 'Mật khẩu phải là chuỗi' })
    @IsOptional()
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password?: string;

    // Nested profile data - optional
    @ValidateNested()
    @Type(() => UserProfileDataDto)
    @IsOptional()
    profile?: UserProfileDataDto;
}
