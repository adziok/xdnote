import { UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, MessageBody } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RedisPropagatorInterceptor } from '@src/shared/modules/redis-propagator/redis-propagator.interceptor';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway()
export class EventsGateway {
    @SubscribeMessage('events')
    public findAll(): Observable<any> {
        return from([1, 2, 3]).pipe(
            map((item) => {
                return { event: 'events', data: item };
            }),
        );
    }
    
    @SubscribeMessage('message-changed')
    public a(
      @MessageBody() data: string,
    ): Observable<any> {
      console.log(data);
        return from(data).pipe(
            map((item) => {
                return { event: 'events2', data: item };
            }),
        );
    }
}
