export declare class Menu {
    id: number;
    type: number;
    menuName: string;
    menuLink: string;
    moduleName: string;
    controllerName: string;
    actionName: string;
    displayOrder: number;
    showInMenu: number;
    placeHolderId: number;
    applicationId: number;
    parentId: number;
    icon: string;
    parent: Menu;
    children: Menu[];
}
