import { CreateSellDto } from './create-sell.dto';
declare const UpdateSellDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSellDto>>;
export declare class UpdateSellDto extends UpdateSellDto_base {
    status?: number;
    statusCancel?: number;
}
export {};
