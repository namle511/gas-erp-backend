export declare class UserProfileDataDto {
    countryId?: number;
    typeNation?: number;
    typeReligion?: number;
    typeEducation?: number;
    idNumber?: string;
    idProvince?: number;
    idCreatedDate?: string;
    statusMarital?: number;
    dateBeginJob?: string;
    contractType?: number;
    contractBegin?: string;
    contractEnd?: string;
    positionWork?: number;
    positionRoom?: number;
    leaveDate?: string;
    baseSalary?: number;
    bankId?: number;
    bankNo?: string;
    bankBranch?: string;
    socialInsuranceNo?: string;
    taxNo?: string;
    salaryMethod?: number;
}
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    roleId: number;
    phone?: string;
    address?: string;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
    streetId?: number;
    status?: number;
    profile?: UserProfileDataDto;
}
