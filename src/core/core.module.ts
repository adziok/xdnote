import { Module } from '@nestjs/common';

import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { SharedModule } from '@shared/shared.module';
import { EventsGateway } from './test.gateway';

@Module({
    imports: [SharedModule],
    controllers: [CoreController],
    providers: [EventsGateway, CoreService],
})
export class CoreModule {}
