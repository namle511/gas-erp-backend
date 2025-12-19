import { CreateUserDto, UserProfileDataDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateUserDto, "password" | "profile">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    password?: string;
    profile?: UserProfileDataDto;
}
export {};
