-- =====================================================
-- Script Migrate Data Địa chỉ từ gas -> gas_ai
-- =====================================================
-- Database nguồn: gas (bảng gas_gas_*)
-- Database đích: gas_ai (bảng gas_gas_*)
-- LƯU Ý: Script này CHỈ ĐỌC từ database cũ, KHÔNG sửa/xóa gì
-- =====================================================

-- Bước 1: Tắt kiểm tra foreign key
SET FOREIGN_KEY_CHECKS = 0;

-- Bước 2: Xóa data cũ (nếu có) trong bảng đích (chỉ xóa trong gas_ai)
TRUNCATE TABLE gas_ai.gas_gas_province;
TRUNCATE TABLE gas_ai.gas_gas_district;
TRUNCATE TABLE gas_ai.gas_gas_ward;
TRUNCATE TABLE gas_ai.gas_gas_street;

-- Bước 3: Copy data Tỉnh/Thành phố
INSERT INTO gas_ai.gas_gas_province (id, name, short_name, status, slug, display_order)
SELECT id, name, short_name, status, slug, display_order
FROM gas.gas_gas_province;

-- Bước 4: Copy data Quận/Huyện
INSERT INTO gas_ai.gas_gas_district (id, province_id, name, short_name, status, user_id_create)
SELECT id, province_id, name, short_name, status, user_id_create
FROM gas.gas_gas_district;

-- Bước 5: Copy data Phường/Xã
INSERT INTO gas_ai.gas_gas_ward (id, province_id, district_id, name, name_vi, slug, status, user_id_create)
SELECT id, province_id, district_id, name, name_vi, slug, status, user_id_create
FROM gas.gas_gas_ward;

-- Bước 6: Copy data Đường
INSERT INTO gas_ai.gas_gas_street (id, province_id, name, name_vi, slug, status, user_id_create)
SELECT id, province_id, name, name_vi, slug, status, user_id_create
FROM gas.gas_gas_street;

-- Bước 7: Bật lại kiểm tra foreign key
SET FOREIGN_KEY_CHECKS = 1;

-- Bước 8: Kiểm tra kết quả
SELECT 'Provinces' as 'Table', COUNT(*) as 'Count' FROM gas_ai.gas_gas_province
UNION ALL
SELECT 'Districts', COUNT(*) FROM gas_ai.gas_gas_district
UNION ALL
SELECT 'Wards', COUNT(*) FROM gas_ai.gas_gas_ward
UNION ALL
SELECT 'Streets', COUNT(*) FROM gas_ai.gas_gas_street;

-- =====================================================
-- HOÀN THÀNH! Không có thay đổi nào trong database gas
-- =====================================================
