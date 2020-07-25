import { EventResponse } from './../../shared/types/event-response.type';
import { convertToEvent } from './../../shared/utils/convert-to-event.util';
import { NoteService } from './note.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, MessageBody } from '@nestjs/websockets';

import { RedisPropagatorInterceptor } from '@src/shared/modules/redis-propagator/redis-propagator.interceptor';
import { RedisPropagatorService } from '@shared/modules/redis-propagator/redis-propagator.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway()
export class NoteGateway {

    constructor(private noteService: NoteService, private redisPropagatorService: RedisPropagatorService) {}

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @SubscribeMessage('update-message')
    public async updateNote(@MessageBody() data: UpdateNoteDto) {
        const updatedMessage = await this.noteService.updateOneById(data);
    
        return ({ event: 'updated-message', data: updatedMessage });
    }

}
