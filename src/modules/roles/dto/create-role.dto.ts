import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRoleDto {
    @IsString({ message: 'Tên vai trò phải là chuỗi' })
    @IsNotEmpty({ message: 'Vui lòng nhập tên vai trò' })
    roleName: string;

    @IsString()
    @IsOptional()
    roleShortName?: string;

    @IsNumber()
    @IsOptional()
    applicationId?: number;

    @IsNumber()
    @IsOptional()
    status?: number;
}
