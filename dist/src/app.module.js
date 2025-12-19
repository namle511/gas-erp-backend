"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const agents_module_1 = require("./modules/agents/agents.module");
const provinces_module_1 = require("./modules/provinces/provinces.module");
const districts_module_1 = require("./modules/districts/districts.module");
const wards_module_1 = require("./modules/wards/wards.module");
const streets_module_1 = require("./modules/streets/streets.module");
const customers_module_1 = require("./modules/customers/customers.module");
const materials_module_1 = require("./modules/materials/materials.module");
const material_types_module_1 = require("./modules/material-types/material-types.module");
const menus_module_1 = require("./modules/menus/menus.module");
const roles_module_1 = require("./modules/roles/roles.module");
const user_profiles_module_1 = require("./modules/user-profiles/user-profiles.module");
const reports_module_1 = require("./modules/reports/reports.module");
const sells_module_1 = require("./modules/sells/sells.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 3306),
                    username: configService.get('DB_USERNAME', 'root'),
                    password: configService.get('DB_PASSWORD', ''),
                    database: configService.get('DB_DATABASE', 'gas'),
                    autoLoadEntities: true,
                    synchronize: false,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            agents_module_1.AgentsModule,
            provinces_module_1.ProvincesModule,
            districts_module_1.DistrictsModule,
            wards_module_1.WardsModule,
            streets_module_1.StreetsModule,
            customers_module_1.CustomersModule,
            materials_module_1.MaterialsModule,
            material_types_module_1.MaterialTypesModule,
            menus_module_1.MenusModule,
            roles_module_1.RolesModule,
            user_profiles_module_1.UserProfilesModule,
            reports_module_1.ReportsModule,
            sells_module_1.SellsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map