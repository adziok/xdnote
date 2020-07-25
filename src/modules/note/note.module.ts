import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Note } from './model/note.model';
import { NoteRepository } from './model/note.repository';
import { NoteGateway } from './note.gateway';

@Module({
    imports: [
        TypegooseModule.forFeature([Note]),
    ],
    controllers: [NoteController],
    providers: [NoteService, NoteRepository, NoteGateway],
    exports: [NoteService,],
})
export class NoteModule {}
