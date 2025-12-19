import { Province } from './province.entity';
import { Ward } from './ward.entity';
export declare class District {
    id: number;
    provinceId: number;
    name: string;
    shortName: string;
    status: number;
    userIdCreate: number;
    province: Province;
    wards: Ward[];
}
