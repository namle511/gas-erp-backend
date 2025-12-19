-- Script to clean up orphan profiles in gas_ai database
-- Delete profiles where user_id doesn't exist in gas_users

-- Step 1: Check how many orphan profiles exist
SELECT COUNT(*) as orphan_count
FROM gas_users_profile p
LEFT JOIN gas_users u ON u.id = p.user_id
WHERE u.id IS NULL;

-- Step 2: Preview orphan profiles (optional)
SELECT p.id, p.user_id, p.type, p.date_begin_job, p.leave_date
FROM gas_users_profile p
LEFT JOIN gas_users u ON u.id = p.user_id
WHERE u.id IS NULL
LIMIT 10;

-- Step 3: Delete orphan profiles
DELETE p FROM gas_users_profile p
LEFT JOIN gas_users u ON u.id = p.user_id
WHERE u.id IS NULL;

-- Step 4: Verify cleanup
SELECT 
    (SELECT COUNT(*) FROM gas_users_profile) as total_profiles,
    (SELECT COUNT(*) FROM gas_users_profile p 
     LEFT JOIN gas_users u ON u.id = p.user_id 
     WHERE u.id IS NULL) as remaining_orphans;
