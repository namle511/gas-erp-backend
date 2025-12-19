import { District } from './district.entity';
export declare class Province {
    id: number;
    name: string;
    shortName: string;
    status: number;
    slug: string;
    displayOrder: number;
    districts: District[];
}
