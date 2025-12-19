import * as mysql from 'mysql2/promise';

async function cloneMaterials() {
  console.log('🔄 Bắt đầu clone data từ gas.gas_gas_materials sang gas_ai.gas_gas_materials...\n');

  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    multipleStatements: true,
  });

  try {
    // Check source data count
    const [sourceRows] = await connection.query('SELECT COUNT(*) as count FROM gas.gas_gas_materials');
    const sourceCount = (sourceRows as any)[0].count;
    console.log(`📊 Số lượng records trong gas.gas_gas_materials: ${sourceCount}`);

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS gas_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');

    // Get table structure from source
    const [createTable] = await connection.query('SHOW CREATE TABLE gas.gas_gas_materials');
    const createStatement = (createTable as any)[0]['Create Table'].replace('CREATE TABLE `gas_gas_materials`', 'CREATE TABLE IF NOT EXISTS `gas_ai`.`gas_gas_materials`');

    await connection.query(createStatement);
    console.log('✅ Đã tạo/kiểm tra bảng gas_ai.gas_gas_materials');

    // Check existing data in target
    const [targetRows] = await connection.query('SELECT COUNT(*) as count FROM gas_ai.gas_gas_materials');
    const targetCount = (targetRows as any)[0].count;
    console.log(`📊 Số lượng records hiện có trong gas_ai.gas_gas_materials: ${targetCount}`);

    if (targetCount > 0) {
      console.log('⚠️  Bảng đích đã có data. Sẽ truncate và clone lại...');
      await connection.query('TRUNCATE TABLE gas_ai.gas_gas_materials');
    }

    // Clone data
    await connection.query(`
      INSERT INTO gas_ai.gas_gas_materials 
      SELECT * FROM gas.gas_gas_materials
    `);

    // Verify
    const [newCount] = await connection.query('SELECT COUNT(*) as count FROM gas_ai.gas_gas_materials');
    const finalCount = (newCount as any)[0].count;

    console.log(`\n✅ Clone thành công! Đã copy ${finalCount} records.`);

    // Show sample data
    const [samples] = await connection.query(`
      SELECT id, materials_no, name, name_vi, status 
      FROM gas_ai.gas_gas_materials 
      ORDER BY id DESC LIMIT 5
    `);
    console.log('\n📝 5 records mới nhất:');
    console.table(samples);

    // Also clone materials_type table
    console.log('\n\n🔄 Clone thêm bảng gas_gas_materials_type...');

    const [typeSource] = await connection.query('SELECT COUNT(*) as count FROM gas.gas_gas_materials_type');
    console.log(`📊 Số lượng records trong gas.gas_gas_materials_type: ${(typeSource as any)[0].count}`);

    const [createTypeTable] = await connection.query('SHOW CREATE TABLE gas.gas_gas_materials_type');
    const createTypeStatement = (createTypeTable as any)[0]['Create Table'].replace('CREATE TABLE `gas_gas_materials_type`', 'CREATE TABLE IF NOT EXISTS `gas_ai`.`gas_gas_materials_type`');

    await connection.query(createTypeStatement);
    await connection.query('TRUNCATE TABLE gas_ai.gas_gas_materials_type');
    await connection.query('INSERT INTO gas_ai.gas_gas_materials_type SELECT * FROM gas.gas_gas_materials_type');

    const [typeFinal] = await connection.query('SELECT COUNT(*) as count FROM gas_ai.gas_gas_materials_type');
    console.log(`✅ Clone thành công! Đã copy ${(typeFinal as any)[0].count} records loại vật tư.`);

  } catch (error) {
    console.error('❌ Lỗi:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

cloneMaterials();
