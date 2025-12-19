import { Material } from './material.entity';
export declare class MaterialType {
    id: number;
    name: string;
    status: number;
    groupType: number;
    suppliesAccount: string;
    costPriceAccount: string;
    revenueAccount: string;
    discountAccount: string;
    returnedAccount: string;
    linkContent: string;
    materials: Material[];
}
