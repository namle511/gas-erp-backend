import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AgentsModule } from './modules/agents/agents.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { DistrictsModule } from './modules/districts/districts.module';
import { WardsModule } from './modules/wards/wards.module';
import { StreetsModule } from './modules/streets/streets.module';
import { CustomersModule } from './modules/customers/customers.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { MaterialTypesModule } from './modules/material-types/material-types.module';
import { MenusModule } from './modules/menus/menus.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserProfilesModule } from './modules/user-profiles/user-profiles.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SellsModule } from './modules/sells/sells.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'gas'),
        autoLoadEntities: true,
        synchronize: false, // Không tự động sync vì dùng DB có sẵn
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    AgentsModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    StreetsModule,
    CustomersModule,
    MaterialsModule,
    MaterialTypesModule,
    MenusModule,
    RolesModule,
    UserProfilesModule,
    ReportsModule,
    SellsModule,
  ],
})
export class AppModule { }

