import { Controller, Get } from '@nestjs/common';

import { NoteService } from './note.service';

@Controller('/note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get()
    public ping() {
        return 'pong';
    }

}
