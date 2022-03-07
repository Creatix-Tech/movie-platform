import { PreconditionFailedException } from '@nestjs/common';

export class FailedToRemoveMovieException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_remove_movie', error);
    }
}
