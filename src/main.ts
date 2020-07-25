import { NestFactory } from '@nestjs/core';

import { CoreModule } from '@src/core/core.module';
import { ConfigService } from '@src/shared/modules/config/config.service';
import { initAdapters } from '@src/core/adapter.init';

async function bootstrap() {
    const app = await NestFactory.create(CoreModule);

    const config: ConfigService = app.get(ConfigService);

    initAdapters(app);

    await app.listen(config.port);
}

bootstrap();
