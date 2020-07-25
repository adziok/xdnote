import { Injectable } from '@nestjs/common';

import { NoteRepository } from './model/note.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './model/note.model';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
    constructor(private noteRepository: NoteRepository) {}

    public async create(createNoteDto: CreateNoteDto): Promise<Note> {
        return await this.noteRepository.create(createNoteDto);
    }
    
    public async updateOneById(updateBody: UpdateNoteDto): Promise<Note> {
        return await this.noteRepository.updateOneById(updateBody);
    }

}
