import * as mysql from 'mysql2/promise';

async function checkMenusTable() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
    });

    try {
        console.log('🔍 Kiểm tra cấu trúc bảng gas_menus:\n');

        const [columns] = await connection.query(`
      DESCRIBE gas.gas_menus
    `);
        console.table(columns);

        console.log('\n📊 Dữ liệu hiện có trong gas_menus:');
        const [data] = await connection.query(`
      SELECT * FROM gas.gas_menus ORDER BY display_order, id LIMIT 20
    `);
        console.table(data);

    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        await connection.end();
    }
}

checkMenusTable();
