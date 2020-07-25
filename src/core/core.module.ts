import { Module } from '@nestjs/common';

import { NoteModule } from './../modules/note/note.module';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { SharedModule } from '@shared/shared.module';
import { EventsGateway } from './test.gateway';
import { ConfigModule } from '@shared/modules/config/config.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from '@shared/modules/config/config.service';

@Module({
    imports: [
        ConfigModule,
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.mongoConnectionString,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }),
            inject: [ConfigService],
        }),
        SharedModule,
        NoteModule
    ],
    controllers: [CoreController],
    providers: [EventsGateway, CoreService],
})
export class CoreModule {}
