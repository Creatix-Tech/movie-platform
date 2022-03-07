import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MovieTag } from '../../common/constants';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
    @Prop({ required: true, index: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    director: string;

    @Prop({ required: true })
    cast: string;

    @Prop({ required: true })
    tags: MovieTag[];

    @Prop({ required: false, default: '-' })
    rating: string;
}

const MovieSchema = SchemaFactory.createForClass(Movie);

export const MovieModel = { name: Movie.name, schema: MovieSchema };
