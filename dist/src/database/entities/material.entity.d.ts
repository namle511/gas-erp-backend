import { MaterialType } from './material-type.entity';
export declare class Material {
    id: number;
    parentId: number;
    materialsNo: string;
    name: string;
    unit: string;
    materialsTypeId: number;
    nameVi: string;
    status: number;
    nameStoreCard: string;
    price: number;
    image: string;
    materialsIdVo: number;
    description: string;
    displayOrder: number;
    nameInvoice: string;
    weight: number;
    isTax: number;
    createdBy: number;
    createdDate: Date;
    createdDateBigint: number;
    suppliesAccount: string;
    costPriceAccount: string;
    revenueAccount: string;
    discountAccount: string;
    materialType: MaterialType;
}
