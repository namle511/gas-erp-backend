import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateUserProfileDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    @IsOptional()
    type?: number;

    // Thông tin cá nhân
    @IsNumber()
    @IsOptional()
    countryId?: number;

    @IsNumber()
    @IsOptional()
    typeNation?: number;

    @IsNumber()
    @IsOptional()
    typeReligion?: number;

    @IsNumber()
    @IsOptional()
    typeEducation?: number;

    @IsString()
    @IsOptional()
    idNumber?: string;

    @IsNumber()
    @IsOptional()
    idProvince?: number;

    @IsDateString()
    @IsOptional()
    idCreatedDate?: string;

    @IsNumber()
    @IsOptional()
    statusMarital?: number;

    // Thông tin công việc
    @IsDateString()
    @IsOptional()
    dateBeginJob?: string;

    @IsNumber()
    @IsOptional()
    contractType?: number;

    @IsDateString()
    @IsOptional()
    contractBegin?: string;

    @IsDateString()
    @IsOptional()
    contractEnd?: string;

    @IsNumber()
    @IsOptional()
    positionWork?: number;

    @IsNumber()
    @IsOptional()
    positionRoom?: number;

    @IsDateString()
    @IsOptional()
    leaveDate?: string;

    // Thông tin tài chính
    @IsNumber()
    @IsOptional()
    baseSalary?: number;

    @IsNumber()
    @IsOptional()
    bankId?: number;

    @IsString()
    @IsOptional()
    bankNo?: string;

    @IsString()
    @IsOptional()
    bankBranch?: string;

    @IsNumber()
    @IsOptional()
    bankProvinceId?: number;

    @IsString()
    @IsOptional()
    socialInsuranceNo?: string;

    @IsString()
    @IsOptional()
    taxNo?: string;

    @IsNumber()
    @IsOptional()
    salaryMethod?: number;

    // Địa chỉ
    @IsNumber()
    @IsOptional()
    addressHomeProvince?: number;

    @IsNumber()
    @IsOptional()
    addressLiveProvince?: number;

    @IsString()
    @IsOptional()
    json?: string;
}
