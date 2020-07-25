import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticatedSocket } from '@src/shared/modules/socket-state/socket-state.adapter';

import { RedisPropagatorService } from './redis-propagator.service';

@Injectable()
export class RedisPropagatorInterceptor<T> implements NestInterceptor<T, WsResponse<T>> {
    public constructor(private readonly redisPropagatorService: RedisPropagatorService) {}

    public intercept(context: ExecutionContext, next: CallHandler): Observable<WsResponse<T>> {
        const socket: AuthenticatedSocket & { id: any } = context.switchToWs().getClient();

        return next.handle().pipe(
            tap((data) => {
                this.redisPropagatorService.propagateEvent({
                    ...data,
                    socketId: socket.id,
                    userId: socket.auth?.userId,
                });
            }),
        );
    }
}