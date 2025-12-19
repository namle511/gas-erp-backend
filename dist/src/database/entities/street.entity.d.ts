import { Province } from './province.entity';
export declare class Street {
    id: number;
    provinceId: number;
    name: string;
    nameVi: string;
    slug: string;
    status: number;
    userIdCreate: number;
    province: Province;
}
