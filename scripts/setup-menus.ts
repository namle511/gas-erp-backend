import * as mysql from 'mysql2/promise';

async function setupMenusTable() {
    console.log('🔄 Setup bảng gas_menus cho gas_ai...\n');

    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        multipleStatements: true,
    });

    try {
        // Drop and recreate table in gas_ai
        await connection.query('DROP TABLE IF EXISTS gas_ai.gas_menus');

        await connection.query(`
      CREATE TABLE IF NOT EXISTS gas_ai.gas_menus (
        id INT NOT NULL AUTO_INCREMENT,
        type TINYINT NOT NULL DEFAULT 1,
        menu_name VARCHAR(255) NOT NULL,
        menu_link VARCHAR(255) DEFAULT NULL,
        module_name VARCHAR(100) DEFAULT NULL,
        controller_name VARCHAR(100) DEFAULT NULL,
        action_name VARCHAR(100) DEFAULT NULL,
        display_order INT NOT NULL DEFAULT 1,
        show_in_menu TINYINT NOT NULL DEFAULT 1,
        place_holder_id INT NOT NULL DEFAULT 1,
        application_id INT NOT NULL DEFAULT 1,
        parent_id INT NOT NULL DEFAULT 0,
        icon VARCHAR(50) DEFAULT NULL,
        PRIMARY KEY (id),
        KEY idx_parent_id (parent_id),
        KEY idx_show_in_menu (show_in_menu),
        KEY idx_display_order (display_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        console.log('✅ Đã tạo bảng gas_ai.gas_menus');

        // Clear existing data
        await connection.query('TRUNCATE TABLE gas_ai.gas_menus');

        // Insert current menus from the frontend
        const menus = [
            // Root menus
            { id: 1, menuName: 'Tổng quan', menuLink: '/', icon: 'LayoutDashboard', displayOrder: 1, showInMenu: 1, parentId: 0 },
            { id: 2, menuName: 'Nhân sự', menuLink: '/users', icon: 'Users', displayOrder: 2, showInMenu: 1, parentId: 0 },
            { id: 3, menuName: 'Đại lý', menuLink: '/agents', icon: 'Store', displayOrder: 3, showInMenu: 1, parentId: 0 },
            { id: 4, menuName: 'Khách hàng', menuLink: '/customers', icon: 'UserCheck', displayOrder: 4, showInMenu: 1, parentId: 0 },

            // Vật tư (parent)
            { id: 5, menuName: 'Vật tư', menuLink: '', icon: 'Package', displayOrder: 5, showInMenu: 1, parentId: 0 },
            { id: 6, menuName: 'Danh sách vật tư', menuLink: '/materials', icon: '', displayOrder: 1, showInMenu: 1, parentId: 5 },
            { id: 7, menuName: 'Loại vật tư', menuLink: '/materials/types', icon: '', displayOrder: 2, showInMenu: 1, parentId: 5 },

            // Địa chỉ (parent)
            { id: 8, menuName: 'Địa chỉ', menuLink: '', icon: 'MapPin', displayOrder: 6, showInMenu: 1, parentId: 0 },
            { id: 9, menuName: 'Tỉnh/Thành phố', menuLink: '/address/provinces', icon: '', displayOrder: 1, showInMenu: 1, parentId: 8 },
            { id: 10, menuName: 'Quận/Huyện', menuLink: '/address/districts', icon: '', displayOrder: 2, showInMenu: 1, parentId: 8 },
            { id: 11, menuName: 'Phường/Xã', menuLink: '/address/wards', icon: '', displayOrder: 3, showInMenu: 1, parentId: 8 },
            { id: 12, menuName: 'Đường', menuLink: '/address/streets', icon: '', displayOrder: 4, showInMenu: 1, parentId: 8 },

            // Hệ thống (parent)
            { id: 13, menuName: 'Hệ thống', menuLink: '', icon: 'Settings', displayOrder: 99, showInMenu: 1, parentId: 0 },
            { id: 14, menuName: 'Quản lý Menu', menuLink: '/settings/menus', icon: '', displayOrder: 1, showInMenu: 1, parentId: 13 },
        ];

        for (const menu of menus) {
            await connection.query(`
        INSERT INTO gas_ai.gas_menus (id, menu_name, menu_link, icon, display_order, show_in_menu, parent_id, type, place_holder_id, application_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1, 1)
      `, [menu.id, menu.menuName, menu.menuLink, menu.icon, menu.displayOrder, menu.showInMenu, menu.parentId]);
        }

        console.log(`✅ Đã thêm ${menus.length} menus vào database`);

        // Verify
        const [rows] = await connection.query('SELECT id, menu_name, menu_link, icon, display_order, parent_id FROM gas_ai.gas_menus ORDER BY parent_id, display_order');
        console.log('\n📋 Danh sách menus:');
        console.table(rows);

    } catch (error) {
        console.error('❌ Lỗi:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

setupMenusTable();
