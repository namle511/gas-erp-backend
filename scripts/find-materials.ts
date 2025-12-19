import * as mysql from 'mysql2/promise';

async function findMaterialsTables() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
    });

    try {
        console.log('🔍 Tìm bảng liên quan đến materials trong database gas:\n');

        const [tables] = await connection.query(`
      SELECT table_name, table_rows 
      FROM information_schema.tables 
      WHERE table_schema = 'gas' 
      AND table_name LIKE '%material%'
      ORDER BY table_name
    `);
        console.table(tables);

    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        await connection.end();
    }
}

findMaterialsTables();
