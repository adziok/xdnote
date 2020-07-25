import { prop } from '@typegoose/typegoose';

export class Note {
    // tslint:disable-next-line: variable-name
    _id?: string | any;

    @prop()
    content: string;

    createdAt?: Date;
    updatedAt?: Date;
}

