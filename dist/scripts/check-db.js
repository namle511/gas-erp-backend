"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql2/promise"));
async function checkDatabases() {
    console.log('🔍 Kiểm tra cấu trúc database...\n');
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
    });
    try {
        const [databases] = await connection.query('SHOW DATABASES');
        console.log('📂 Danh sách databases:');
        console.table(databases);
        console.log('\n📋 Bảng trong database "gas":');
        const [gasTables] = await connection.query(`
      SELECT table_name, table_rows 
      FROM information_schema.tables 
      WHERE table_schema = 'gas' 
      AND table_name LIKE '%material%'
      ORDER BY table_name
    `);
        console.table(gasTables);
        if (gasTables.length === 0) {
            console.log('\n📋 Tất cả bảng trong database "gas":');
            const [allTables] = await connection.query(`
        SELECT table_name, table_rows 
        FROM information_schema.tables 
        WHERE table_schema = 'gas'
        ORDER BY table_name
      `);
            console.table(allTables);
        }
        console.log('\n📋 Bảng trong database "gas_ai":');
        const [gasAiTables] = await connection.query(`
      SELECT table_name, table_rows 
      FROM information_schema.tables 
      WHERE table_schema = 'gas_ai'
      ORDER BY table_name
    `);
        console.table(gasAiTables);
    }
    catch (error) {
        console.error('❌ Lỗi:', error);
    }
    finally {
        await connection.end();
    }
}
checkDatabases();
//# sourceMappingURL=check-db.js.map