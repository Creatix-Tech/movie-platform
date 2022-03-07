import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieRatingDocument = MovieRating & Document;

@Schema()
export class MovieRating {
    @Prop({ required: true })
    movieId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    rating: number;
}

const MovieRatingSchema = SchemaFactory.createForClass(MovieRating);

MovieRatingSchema.index({ movieId: 1, userId: 1 }, { unique: true });

export const MovieRatingModel = { name: MovieRating.name, schema: MovieRatingSchema };
