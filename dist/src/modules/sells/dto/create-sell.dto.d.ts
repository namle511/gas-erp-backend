export declare class CreateSellDetailDto {
    materialsId: number;
    materialsParentId: number;
    materialsTypeId?: number;
    qty: number;
    price: number;
    amount?: number;
    amountDiscount?: number;
    promotionAmount?: number;
}
export declare class CreateSellDto {
    customerId: number;
    agentId: number;
    saleId?: number;
    employeeMaintainId?: number;
    typeCustomer?: number;
    orderType?: number;
    source?: number;
    paymentType?: number;
    phone?: string;
    address?: string;
    note?: string;
    provinceId?: number;
    amountDiscount?: number;
    promotionAmount?: number;
    createdDateOnly?: string;
    deliveryTimer?: string;
    details: CreateSellDetailDto[];
}
