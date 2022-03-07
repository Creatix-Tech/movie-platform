import { PreconditionFailedException } from '@nestjs/common';

export class FailedToUpdateFavoriteMovieException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_update_favorite_movie', error);
    }
}
