import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

@Entity('gas_menus')
export class Menu {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'tinyint', default: 1 })
    type: number;

    @Column({ type: 'varchar', length: 255, name: 'menu_name' })
    menuName: string;

    @Column({ type: 'varchar', length: 255, name: 'menu_link', nullable: true })
    menuLink: string;

    @Column({ type: 'varchar', length: 100, name: 'module_name', nullable: true })
    moduleName: string;

    @Column({ type: 'varchar', length: 100, name: 'controller_name', nullable: true })
    controllerName: string;

    @Column({ type: 'varchar', length: 100, name: 'action_name', nullable: true })
    actionName: string;

    @Column({ type: 'int', name: 'display_order', default: 1 })
    displayOrder: number;

    @Column({ type: 'tinyint', name: 'show_in_menu', default: 1 })
    showInMenu: number;

    @Column({ type: 'int', name: 'place_holder_id', default: 1 })
    placeHolderId: number;

    @Column({ type: 'int', name: 'application_id', default: 1 })
    applicationId: number;

    @Column({ type: 'int', name: 'parent_id', default: 0 })
    parentId: number;

    // Icon for new system (not in original table, will be added)
    @Column({ type: 'varchar', length: 50, nullable: true })
    icon: string;

    // Relations
    @ManyToOne(() => Menu, (menu) => menu.children)
    @JoinColumn({ name: 'parent_id' })
    parent: Menu;

    @OneToMany(() => Menu, (menu) => menu.parent)
    children: Menu[];
}
