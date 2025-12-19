-- Script to sync users from 'gas' to 'gas_ai' database
-- Based on user_ids referenced in gas_users_profile

-- Step 1: Find all user_ids in gas_users_profile that don't exist in gas_users
SELECT DISTINCT p.user_id 
FROM gas_ai.gas_users_profile p
LEFT JOIN gas_ai.gas_users u ON u.id = p.user_id
WHERE u.id IS NULL
  AND p.user_id IS NOT NULL;

-- Step 2: Insert missing users from 'gas' database to 'gas_ai' database
-- Execute this query to copy users:
INSERT INTO gas_ai.gas_users (
    id, username, email, password_hash, temp_password,
    first_name, last_name, name_agent, code_account, code_bussiness,
    address, address_vi, house_numbers, phone, gender, birthday,
    type_customer, payment_day, beginning, status, role_id,
    agent_id, sale_id, channel_id, province_id, district_id, ward_id, street_id,
    create_time
)
SELECT 
    u.id, u.username, u.email, u.password_hash, u.temp_password,
    u.first_name, u.last_name, u.name_agent, u.code_account, u.code_bussiness,
    u.address, u.address_vi, u.house_numbers, u.phone, u.gender, u.birthday,
    u.type_customer, u.payment_day, u.beginning, u.status, u.role_id,
    u.agent_id, u.sale_id, u.channel_id, u.province_id, u.district_id, u.ward_id, u.street_id,
    u.create_time
FROM gas.gas_users u
WHERE u.id IN (
    SELECT DISTINCT p.user_id 
    FROM gas_ai.gas_users_profile p
    LEFT JOIN gas_ai.gas_users gu ON gu.id = p.user_id
    WHERE gu.id IS NULL
      AND p.user_id IS NOT NULL
)
ON DUPLICATE KEY UPDATE
    username = VALUES(username),
    email = VALUES(email),
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    phone = VALUES(phone);

-- Step 3: Verify the sync
SELECT 
    (SELECT COUNT(*) FROM gas_ai.gas_users_profile WHERE type = 1) as profile_count,
    (SELECT COUNT(DISTINCT p.user_id) 
     FROM gas_ai.gas_users_profile p 
     INNER JOIN gas_ai.gas_users u ON u.id = p.user_id 
     WHERE p.type = 1) as matched_count;
