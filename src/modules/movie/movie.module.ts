import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModel } from './movie.model';
import { MovieRatingModel } from './movie-rating.model';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { UserModel } from '../user/user.model';

@Module({
    imports: [MongooseModule.forFeature([MovieModel, MovieRatingModel, UserModel])],
    controllers: [MovieController],
    exports: [MovieService],
    providers: [MovieService],
})
export class MovieModule {}
