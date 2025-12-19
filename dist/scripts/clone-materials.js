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
        const [sourceRows] = await connection.query('SELECT COUNT(*) as count FROM gas.gas_gas_materials');
        const sourceCount = sourceRows[0].count;
        console.log(`📊 Số lượng records trong gas.gas_gas_materials: ${sourceCount}`);
        await connection.query('CREATE DATABASE IF NOT EXISTS gas_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
        const [createTable] = await connection.query('SHOW CREATE TABLE gas.gas_gas_materials');
        const createStatement = createTable[0]['Create Table'].replace('CREATE TABLE `gas_gas_materials`', 'CREATE TABLE IF NOT EXISTS `gas_ai`.`gas_gas_materials`');
        await connection.query(createStatement);
        console.log('✅ Đã tạo/kiểm tra bảng gas_ai.gas_gas_materials');
        const [targetRows] = await connection.query('SELECT COUNT(*) as count FROM gas_ai.gas_gas_materials');
        const targetCount = targetRows[0].count;
        console.log(`📊 Số lượng records hiện có trong gas_ai.gas_gas_materials: ${targetCount}`);
        if (targetCount > 0) {
            console.log('⚠️  Bảng đích đã có data. Sẽ truncate và clone lại...');
            await connection.query('TRUNCATE TABLE gas_ai.gas_gas_materials');
        }
        await connection.query(`
      INSERT INTO gas_ai.gas_gas_materials 
      SELECT * FROM gas.gas_gas_materials
    `);
        const [newCount] = await connection.query('SELECT COUNT(*) as count FROM gas_ai.gas_gas_materials');
        const finalCount = newCount[0].count;
        console.log(`\n✅ Clone thành công! Đã copy ${finalCount} records.`);
        const [samples] = await connection.query(`
      SELECT id, materials_no, name, name_vi, status 
      FROM gas_ai.gas_gas_materials 
      ORDER BY id DESC LIMIT 5
    `);
        console.log('\n📝 5 records mới nhất:');
        console.table(samples);
        console.log('\n\n🔄 Clone thêm bảng gas_gas_materials_type...');
        const [typeSource] = await connection.query('SELECT COUNT(*) as count FROM gas.gas_gas_materials_type');
        console.log(`📊 Số lượng records trong gas.gas_gas_materials_type: ${typeSource[0].count}`);
        const [createTypeTable] = await connection.query('SHOW CREATE TABLE gas.gas_gas_materials_type');
        const createTypeStatement = createTypeTable[0]['Create Table'].replace('CREATE TABLE `gas_gas_materials_type`', 'CREATE TABLE IF NOT EXISTS `gas_ai`.`gas_gas_materials_type`');
        await connection.query(createTypeStatement);
        await connection.query('TRUNCATE TABLE gas_ai.gas_gas_materials_type');
        await connection.query('INSERT INTO gas_ai.gas_gas_materials_type SELECT * FROM gas.gas_gas_materials_type');
        const [typeFinal] = await connection.query('SELECT COUNT(*) as count FROM gas_ai.gas_gas_materials_type');
        console.log(`✅ Clone thành công! Đã copy ${typeFinal[0].count} records loại vật tư.`);
    }
    catch (error) {
        console.error('❌ Lỗi:', error);
        throw error;
    }
    finally {
        await connection.end();
    }
}
cloneMaterials();
//# sourceMappingURL=clone-materials.js.map