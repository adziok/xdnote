import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { Note } from './note.model';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

const logger = new Logger('NoteRepository');

@Injectable()
export class NoteRepository {
    constructor(@InjectModel(Note) private readonly noteModel: ReturnModelType<typeof Note>) { }

    public async create(createNoteDto: CreateNoteDto): Promise<Note> {
        return await this.noteModel.create(createNoteDto);
    }
    
    public async updateOneById({ _id, ...updateBody }: UpdateNoteDto): Promise<Note> {
        return await this.noteModel.findOneAndUpdate({ _id }, updateBody, { new: true });
    }
}
