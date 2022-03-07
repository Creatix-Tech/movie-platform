import { PreconditionFailedException } from '@nestjs/common';

export class FailedToGetMovieException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_get_movie', error);
    }
}
