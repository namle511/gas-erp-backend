export declare class DropOrderDto {
    statusCancel: number;
}
export declare class OrderDetailDto {
    materialsId: number;
    materialsTypeId: number;
    qty: number;
    price: number;
    seri?: number;
}
export declare class CompleteOrderDto {
    details?: OrderDetailDto[];
    promotionAmount?: number;
    ptttCode?: string;
    gasRemain?: number;
    gasRemainAmount?: number;
}
export declare class MobileOrdersQueryDto {
    page?: number;
    limit?: number;
    tab?: 'new' | 'my' | 'completed' | 'cancelled';
}
