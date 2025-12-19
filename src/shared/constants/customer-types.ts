/**
 * Customer Types - is_maintain column in users table
 * Migrate from Yii1 PHP constants
 */

// Bò Mối types
export const STORE_CARD_KH_BINH_BO = 1;     // Khách hàng bình bò
export const STORE_CARD_KH_MOI = 2;          // Khách hàng mối
export const STORE_CARD_XE_RAO = 6;          // Khách hàng xe rao

// Hộ Gia Đình types
export const CUSTOMER_HO_GIA_DINH = 3;       // HGĐ thẻ kho
export const STORE_CARD_VIP_HGD = 7;         // KH VIP hộ gia đình
export const STORE_CARD_HGD = 8;             // KH hộ gia đình (từ C# window/web)
export const STORE_CARD_HGD_CCS = 9;         // KH hộ gia đình (từ Android CCS)
export const STORE_CARD_HGD_APP = 11;        // KH hộ gia đình APP

// Other types
export const CUSTOMER_OTHER = 4;             // Không phải KH 3 loại trên
export const CUSTOMER_IS_AGENT = 5;          // KH là đại lý khác trong hệ thống
export const CUSTOMER_IS_EMPLOYEE = 6;       // KH là nhân viên (dùng trong thẻ kho)
export const CUSTOMER_OTHER_OBJ = 0;         // Loại khác (= loại 4)

// Group arrays
export const HGD_TYPES = [
    STORE_CARD_VIP_HGD,      // 7
    STORE_CARD_HGD,          // 8
    STORE_CARD_HGD_CCS,      // 9
    STORE_CARD_HGD_APP,      // 11
];

export const BO_MOI_TYPES = [
    STORE_CARD_KH_BINH_BO,   // 1
    STORE_CARD_KH_MOI,       // 2
];

// Labels
export const CUSTOMER_TYPE_LABELS: Record<number, string> = {
    [STORE_CARD_KH_BINH_BO]: 'Bình Bò',
    [STORE_CARD_KH_MOI]: 'Mối',
    [CUSTOMER_HO_GIA_DINH]: 'HGĐ Thẻ kho',
    [CUSTOMER_OTHER]: 'Loại khác',
    [CUSTOMER_IS_AGENT]: 'Đại lý',
    [STORE_CARD_XE_RAO]: 'Xe Rao',
    [STORE_CARD_VIP_HGD]: 'VIP HGĐ',
    [STORE_CARD_HGD]: 'HGĐ',
    [STORE_CARD_HGD_CCS]: 'HGĐ CCS',
    [STORE_CARD_HGD_APP]: 'HGĐ APP',
};
