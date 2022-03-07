import { PreconditionFailedException } from '@nestjs/common';

export class FailedToCreateMovieException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_create_movie', error);
    }
}
