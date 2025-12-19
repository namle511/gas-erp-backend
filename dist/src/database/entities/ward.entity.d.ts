import { Province } from './province.entity';
import { District } from './district.entity';
export declare class Ward {
    id: number;
    provinceId: number;
    districtId: number;
    name: string;
    nameVi: string;
    slug: string;
    status: number;
    userIdCreate: number;
    province: Province;
    district: District;
}
