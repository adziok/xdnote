import { ConfigModule } from './modules/config/config.module';
import { Global, Module } from '@nestjs/common';

import { RedisPropagatorModule } from './modules/redis-propagator/redis-propagator.module';
import { RedisModule } from './modules/redis/redis.module';
import { SocketStateModule } from './modules/socket-state/socket-state.module';

@Global()
@Module({
    imports: [RedisModule, RedisPropagatorModule, SocketStateModule, ConfigModule],
    exports: [RedisModule, RedisPropagatorModule, SocketStateModule, ConfigModule],
})
export class SharedModule {}
