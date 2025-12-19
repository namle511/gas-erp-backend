import { IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateMenuDto {
    @IsNotEmpty({ message: 'Tên menu không được để trống' })
    @IsString()
    @MaxLength(255)
    menuName: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    menuLink?: string;

    @IsOptional()
    @IsNumber()
    type?: number;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    moduleName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    controllerName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    actionName?: string;

    @IsOptional()
    @IsNumber()
    displayOrder?: number;

    @IsOptional()
    @IsNumber()
    showInMenu?: number;

    @IsOptional()
    @IsNumber()
    placeHolderId?: number;

    @IsOptional()
    @IsNumber()
    applicationId?: number;

    @IsOptional()
    @IsNumber()
    parentId?: number;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    icon?: string;
}
