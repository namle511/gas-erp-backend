import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { User, Role } from '../../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [AgentsController],
    providers: [AgentsService],
    exports: [AgentsService],
})
export class AgentsModule { }
