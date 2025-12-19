import * as mysql from 'mysql2/promise';

async function checkDatabases() {
    console.log('🔍 Kiểm tra cấu trúc database...\n');

    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
    });

    try {
        // List all databases
        const [databases] = await connection.query('SHOW DATABASES');
        console.log('📂 Danh sách databases:');
        console.table(databases);

        // Check tables in 'gas' database
        console.log('\n📋 Bảng trong database "gas":');
        const [gasTables] = await connection.query(`
      SELECT table_name, table_rows 
      FROM information_schema.tables 
      WHERE table_schema = 'gas' 
      AND table_name LIKE '%material%'
      ORDER BY table_name
    `);
        console.table(gasTables);

        // If no material tables, show all tables
        if ((gasTables as any[]).length === 0) {
            console.log('\n📋 Tất cả bảng trong database "gas":');
            const [allTables] = await connection.query(`
        SELECT table_name, table_rows 
        FROM information_schema.tables 
        WHERE table_schema = 'gas'
        ORDER BY table_name
      `);
            console.table(allTables);
        }

        // Check tables in 'gas_ai' database
        console.log('\n📋 Bảng trong database "gas_ai":');
        const [gasAiTables] = await connection.query(`
      SELECT table_name, table_rows 
      FROM information_schema.tables 
      WHERE table_schema = 'gas_ai'
      ORDER BY table_name
    `);
        console.table(gasAiTables);

    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        await connection.end();
    }
}

checkDatabases();
