import { Injectable, Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { get } from 'lodash';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.model';
import { MovieRating, MovieRatingDocument } from './movie-rating.model';
import { User, UserDocument } from '../user/user.model';
import { PageDto } from '../../common/dto';
import { MovieDto, UpdateMovieDto, MoviePageOptionsDto } from './dto';
import {
    FailedToCreateMovieException,
    FailedToGetMovieException,
    MovieNotFoundException,
    FailedToRemoveMovieException,
    FailedToUpdateMovieException
} from '../../common/exceptions';

@Injectable()
export class MovieService {
    private logger: Logger = new Logger(MovieService.name);

    constructor(
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
        @InjectModel(MovieRating.name) private movieRatingModel: Model<MovieRatingDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    async createMovie(data): Promise<MovieDto> {
        try {
            const movie = new this.movieModel(data);
            return await movie.save();
        } catch (err) {
            this.logger.error('Failed to create movie');
            this.logger.error(err.toString());
            throw new FailedToCreateMovieException(err.toString());
        }
    }

    async getAllMovies(params: MoviePageOptionsDto): Promise<PageDto<MovieDto>> {
        try {
            const { skip = 0, limit = 10, title, tag } = params;

            const filter: any = {};
            if (title) {
                filter.title = { $regex: `.*${title}.*`, $options: 'i' };
            }
            if (tag) {
                filter.tags = tag;
            }

            const [data, itemCount] = await Promise.all([
                this.movieModel.find(filter).skip(Number(skip)).limit(Number(limit)),
                this.movieModel.countDocuments(filter)
            ]);

            return {
                data,
                meta: {
                    itemCount,
                    skip,
                    limit
                }
            };
        } catch (err) {
            this.logger.error('Failed to get movies');
            this.logger.error(err.toString());
            throw new FailedToGetMovieException(err.toString());
        }
    }

    async getMovieById(id: string): Promise<MovieDto> {
        let movie;
        try {
            movie = await this.movieModel.findById(id);
        } catch (err) {
            this.logger.error('Failed to get movie');
            this.logger.error(err.toString());
            throw new FailedToGetMovieException(err.toString());
        }
        if (!movie) {
            this.logger.error(`No movie found with id: ${id}`);
            throw new MovieNotFoundException(`No movie found with id: ${id}`);
        }
        return movie;
    }

    async updateMovie(movieId: string, data: UpdateMovieDto): Promise<MovieDto> {
        let movie;
        try {
            movie = await this.movieModel.findOneAndUpdate({ _id: movieId }, data, { new: true });
        } catch (err) {
            this.logger.error(`Failed to update movie with id: ${movieId}`);
            this.logger.error(err.toString());
            throw new FailedToUpdateMovieException(err.toString());
        }
        if (!movie) {
            this.logger.error(`No movie found with id: ${movieId}`);
            throw new MovieNotFoundException(`No movie found with id: ${movieId}`);
        }

        return this.getMovieById(movie._id);
    }

    async removeMovie(movieId: string): Promise<void> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await this.movieModel.deleteOne({ _id: movieId }, { session });

            await this.userModel.updateMany(
                { favorites: movieId },
                {
                    $pull: {
                        favorites: movieId
                    }
                },
                { session }
            );

            await this.movieRatingModel.deleteMany({ movieId }, { session });

            await session.commitTransaction()
        } catch (err) {
            await session.abortTransaction();
            this.logger.error(`Failed to remove movie with id: ${movieId}`);
            this.logger.error(err.toString());
            throw new FailedToRemoveMovieException(err.toString());
        } finally {
            session.endSession();
        }
    }

    async rateMovie(movieId: string, userId: string, rating: number): Promise<MovieDto> {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            await this.movieRatingModel.updateOne(
                { movieId, userId },
                { rating },
                { upsert: true, new: true, session }
            );

            const result = await this.movieRatingModel.aggregate([
                { $match: { movieId } },
                {
                    $group: {
                        _id: null,
                        avgRating: { $avg: '$rating' }
                    }
                }
            ]).session(session);

            const avgRating = get(result, '[0].avgRating');

            const movie = await this.movieModel.findByIdAndUpdate(
                movieId,
                { rating: avgRating.toFixed(1) },
                { new: true, session }
            ).session(session);
            await session.commitTransaction();

            return movie;
        } catch (err) {
            await session.abortTransaction();
            this.logger.error(`Failed to rate movie with id: ${movieId}`);
            this.logger.error(err.toString());
            throw new FailedToRemoveMovieException(err.toString());
        } finally {
            session.endSession();
        }
    }
}
