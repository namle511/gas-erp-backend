"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const typeorm_1 = require("typeorm");
let Menu = class Menu {
    id;
    type;
    menuName;
    menuLink;
    moduleName;
    controllerName;
    actionName;
    displayOrder;
    showInMenu;
    placeHolderId;
    applicationId;
    parentId;
    icon;
    parent;
    children;
};
exports.Menu = Menu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], Menu.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'menu_name' }),
    __metadata("design:type", String)
], Menu.prototype, "menuName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'menu_link', nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "menuLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'module_name', nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "moduleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'controller_name', nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "controllerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'action_name', nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "actionName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'display_order', default: 1 }),
    __metadata("design:type", Number)
], Menu.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'show_in_menu', default: 1 }),
    __metadata("design:type", Number)
], Menu.prototype, "showInMenu", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'place_holder_id', default: 1 }),
    __metadata("design:type", Number)
], Menu.prototype, "placeHolderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'application_id', default: 1 }),
    __metadata("design:type", Number)
], Menu.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'parent_id', default: 0 }),
    __metadata("design:type", Number)
], Menu.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu, (menu) => menu.children),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Menu)
], Menu.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Menu, (menu) => menu.parent),
    __metadata("design:type", Array)
], Menu.prototype, "children", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Entity)('gas_menus')
], Menu);
//# sourceMappingURL=menu.entity.js.map