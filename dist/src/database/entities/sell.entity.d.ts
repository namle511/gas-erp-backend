import { SellDetail } from './sell-detail.entity';
import { User } from './user.entity';
export declare enum SellStatus {
    NEW = 1,
    PAID = 2,
    CANCEL = 3
}
export declare enum SellOrderType {
    NORMAL = 1,
    BO_BINH = 2,
    THE_CHAN = 3,
    THU_VO = 4,
    BAN_GAS_VO = 5,
    WATER = 6,
    WATER_THE_CHAN = 7,
    WATER_THU_VO = 8,
    FREE = 9,
    CONSUMER_GOODS = 10,
    ELECTRIC = 11,
    GIAT_UI = 12
}
export declare enum SellSource {
    WINDOW = 1,
    APP = 2,
    WEB = 3,
    AUTO_SALES = 4,
    MOMO = 5,
    SENDO = 6,
    TIKI = 7,
    HIFPT = 8,
    WEB_GAS24H = 9,
    TECHRES = 10
}
export declare enum SellPaymentType {
    CASH = 1,
    VNPAY = 2,
    MOMO = 3,
    SENDO = 4,
    NAPAS = 5,
    TIKI = 6,
    HIFPT = 7,
    QR_BANK_TRANSFER = 8
}
export declare class Sell {
    id: number;
    firstOrder: number;
    source: number;
    status: number;
    statusCancel: number;
    codeNo: string;
    orderType: number;
    typeAmount: number;
    orderTypeStatus: number;
    customerId: number;
    typeCustomer: number;
    phone: number;
    saleId: number;
    firstName: string;
    agentId: number;
    provinceId: number;
    employeeMaintainId: number;
    roleIdEmployee: number;
    uidLogin: number;
    callCenterId: number;
    createdDateOnly: Date;
    createdDate: Date;
    note: string;
    lastUpdateBy: number;
    lastUpdateTime: Date;
    qtyDiscount: number;
    amountDiscount: number;
    amountBuVo: number;
    transactionHistoryId: number;
    appPromotionUserId: number;
    promotionId: number;
    promotionAmount: number;
    promotionType: number;
    total: number;
    grandTotal: number;
    address: string;
    supportId: number;
    ptttCode: string;
    callId: number;
    callEndTime: number;
    highPrice: number;
    completeTime: Date;
    customerNew: number;
    platform: number;
    v1DiscountAmount: number;
    v1DiscountId: number;
    gasRemain: number;
    gasRemainAmount: number;
    kgEmpty: number;
    kgHasGas: number;
    deliveryTimer: Date | null;
    isTimer: number;
    paymentType: number;
    refcode: string;
    codePartnerId: number;
    promotionExtraId: number;
    promotionExtraAmount: number;
    datePaid: number;
    customer: User;
    agent: User;
    employeeMaintain: User;
    sale: User;
    userLogin: User;
    details: SellDetail[];
}
