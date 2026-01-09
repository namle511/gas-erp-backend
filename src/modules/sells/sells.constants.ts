// Transaction/Action Types - Based on Yii1 legacy
export const TransactionActionType = {
  EMPLOYEE_CHANGE_AGENT: -2,
  EMPLOYEE_CONFIRM: -1,
  EMPLOYEE_FREE: 0,           // Đơn mới, chưa có nhân viên nào nhận
  EMPLOYEE_NHAN_GIAO_HANG: 1, // Nhận đơn hàng
  EMPLOYEE_HUY_GIAO_HANG: 2,  // Hủy nhận đơn hàng
  EMPLOYEE_DROP: 3,           // Hủy đơn hàng
  EMPLOYEE_CHANGE: 4,         // Sửa đơn hàng
  EMPLOYEE_COMPLETE: 5,       // Hoàn thành đơn
  EMPLOYEE_CHANGE_NOT_PAID: 6,
  CALLCENTER_CHANGE: 7,
  CHANGE_DISCOUNT: 8,
  CUSTOMER_DROP: 9,
} as const;

// Transaction Status - Based on Yii1 legacy
export const TransactionStatus = {
  STATUS_NEW: 1,
  STATUS_COMPLETE: 2,
  STATUS_TRY_APP: 3,
  STATUS_PRICE_HIGH: 4,
  STATUS_OTHER: 5,
  STATUS_PROCESSING: 6,
  STATUS_DELIVERY_PROCESSING: 7,  // Đang giao hàng
  STATUS_CANCEL_BY_CUSTOMER: 8,
  STATUS_CANCEL_BY_EMPLOYEE: 9,
  STATUS_DONE: 10,
} as const;

// Sell Status - Based on Yii1 legacy
export const SellStatus = {
  STATUS_NEW: 1,     // Mới
  STATUS_PAID: 2,    // Hoàn thành
  STATUS_CANCEL: 3,  // Hủy
} as const;

// Sell Order Types
export const SellOrderType = {
  ORDER_TYPE_NORMAL: 1,
  ORDER_TYPE_BO_BINH: 2,
  ORDER_TYPE_THE_CHAN: 3,
  ORDER_TYPE_THU_VO: 4,
  ORDER_TYPE_BAN_GAS_VO: 5,
  ORDER_TYPE_WATER: 6,
  ORDER_TYPE_WATER_THE_CHAN: 7,
  ORDER_TYPE_WATER_THU_VO: 8,
  ORDER_TYPE_FREE: 9,
  ORDER_TYPE_CONSUMER_GOODS: 10,
  ORDER_TYPE_ELECTRIC: 11,
  ORDER_TYPE_GIAT_UI: 12,
} as const;

// Sell Source
export const SellSource = {
  SOURCE_WINDOW: 1,
  SOURCE_APP: 2,
  SOURCE_WEB: 3,
  SOURCE_AUTO_SALES: 4,
  SOURCE_MOMO: 5,
  SOURCE_SENDO: 6,
  SOURCE_TIKI: 7,
  SOURCE_HIFPT: 8,
  SOURCE_WEB_GAS24H: 9,
} as const;

// Cancel Reasons - Based on Yii1 legacy
export const CancelReason = {
  CANCEL_WRONG_INFO: 1,
  CANCEL_PRICE_HIGH: 2,
  CANCEL_WRONG_GIFT: 3,
  CANCEL_SLOW_DELIVERY: 4,
  CANCEL_OTHER: 5,
  CANCEL_DONOT_BU_VO: 6,
  CANCEL_CALL_2_BEN: 7,
  CANCEL_WRONG_GAS: 8,
  CANCEL_GIAO_XA: 9,
  CANCEL_KH_DI_VANG: 10,
  CANCEL_KH_CON_GAS: 11,
  CANCEL_AGENT_WRONG: 12,
  CANCEL_DIEU_SAI: 13,
  CANCEL_CUSTOMER_DEBIT: 14,
  CANCEL_DOUBLE_ORDER: 15,
  CANCEL_CANNOT_CALL: 16,
  CANCEL_KHM: 17,
  CANCEL_BY_APP_CUSTOMER: 18,
  CANCEL_TEST_APP: 19,
  CANCEL_SUPPORT_AGENT_BUSY: 20,
  CANCEL_DOUBLE_CALL: 21,
  CANCEL_MAKE_NEW_ORDER: 22,
} as const;

// Cancel Reason Labels for mobile app
export const CancelReasonLabels: Record<number, string> = {
  [CancelReason.CANCEL_DONOT_BU_VO]: 'Không bù vỏ',
  [CancelReason.CANCEL_CALL_2_BEN]: 'KH gọi 2 bên',
  [CancelReason.CANCEL_WRONG_GAS]: 'Mang nhầm gas',
  [CancelReason.CANCEL_WRONG_INFO]: 'Sai địa chỉ',
  [CancelReason.CANCEL_PRICE_HIGH]: 'Giá cao',
  [CancelReason.CANCEL_WRONG_GIFT]: 'Sai quà',
  [CancelReason.CANCEL_SLOW_DELIVERY]: 'Giao chậm',
  [CancelReason.CANCEL_GIAO_XA]: 'Giao xa',
  [CancelReason.CANCEL_KH_DI_VANG]: 'KH đi có việc',
  [CancelReason.CANCEL_KH_CON_GAS]: 'KH còn gas',
  [CancelReason.CANCEL_CUSTOMER_DEBIT]: 'KH nợ tiền',
  [CancelReason.CANCEL_AGENT_WRONG]: 'Tổng đài điều nhầm đại lý',
  [CancelReason.CANCEL_DOUBLE_ORDER]: 'Tổng đài điều 2 lần',
  [CancelReason.CANCEL_CANNOT_CALL]: 'Gọi khách không nghe máy',
  [CancelReason.CANCEL_SUPPORT_AGENT_BUSY]: 'Nhờ đại lý khác giao hỗ trợ',
  [CancelReason.CANCEL_KHM]: 'Khách hàng mối',
  [CancelReason.CANCEL_BY_APP_CUSTOMER]: 'Khách hàng hủy app',
  [CancelReason.CANCEL_TEST_APP]: 'Test app',
  [CancelReason.CANCEL_DOUBLE_CALL]: 'KH gọi 2 lần',
  [CancelReason.CANCEL_MAKE_NEW_ORDER]: 'Đã giao lại được',
};

// Cancel reasons available for mobile app (subset)
export const MobileCancelReasons = [
  CancelReason.CANCEL_DONOT_BU_VO,
  CancelReason.CANCEL_CALL_2_BEN,
  CancelReason.CANCEL_PRICE_HIGH,
  CancelReason.CANCEL_GIAO_XA,
  CancelReason.CANCEL_KH_DI_VANG,
  CancelReason.CANCEL_KH_CON_GAS,
  CancelReason.CANCEL_CUSTOMER_DEBIT,
  CancelReason.CANCEL_CANNOT_CALL,
  CancelReason.CANCEL_SUPPORT_AGENT_BUSY,
];
