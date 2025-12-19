-- Clone users_profile from gas to gas_ai database
-- Run this script in MySQL to migrate user profile data

INSERT INTO gas_ai.gas_users_profile (
    id, user_id, type, parent_id, country_id, type_nation, type_religion,
    type_education, id_number, id_province, id_created_date, status_marital,
    date_begin_job, contract_type, contract_begin, contract_end,
    position_work, position_room, leave_date, base_salary, bank_id,
    bank_no, bank_branch, social_insurance_no, tax_no, salary_method,
    address_home_province, address_live_province, json, update_by, update_time
)
SELECT 
    id, user_id, type, parent_id, country_id, type_nation, type_religion,
    type_education, id_number, id_province, id_created_date, status_marital,
    date_begin_job, contract_type, contract_begin, contract_end,
    position_work, position_room, leave_date, base_salary, bank_id,
    bank_no, bank_branch, social_insurance_no, tax_no, salary_method,
    address_home_province, address_live_province, json, update_by, update_time
FROM gas.gas_users_profile
ON DUPLICATE KEY UPDATE 
    type = VALUES(type),
    parent_id = VALUES(parent_id),
    country_id = VALUES(country_id),
    type_nation = VALUES(type_nation),
    type_religion = VALUES(type_religion),
    type_education = VALUES(type_education),
    id_number = VALUES(id_number),
    id_province = VALUES(id_province),
    id_created_date = VALUES(id_created_date),
    status_marital = VALUES(status_marital),
    date_begin_job = VALUES(date_begin_job),
    contract_type = VALUES(contract_type),
    contract_begin = VALUES(contract_begin),
    contract_end = VALUES(contract_end),
    position_work = VALUES(position_work),
    position_room = VALUES(position_room),
    leave_date = VALUES(leave_date),
    base_salary = VALUES(base_salary),
    bank_id = VALUES(bank_id),
    bank_no = VALUES(bank_no),
    bank_branch = VALUES(bank_branch),
    social_insurance_no = VALUES(social_insurance_no),
    tax_no = VALUES(tax_no),
    salary_method = VALUES(salary_method),
    address_home_province = VALUES(address_home_province),
    address_live_province = VALUES(address_live_province),
    json = VALUES(json),
    update_by = VALUES(update_by),
    update_time = VALUES(update_time);

-- Verify the migration
SELECT COUNT(*) as migrated_count FROM gas_ai.gas_users_profile;
SELECT COUNT(*) as source_count FROM gas.gas_users_profile;
