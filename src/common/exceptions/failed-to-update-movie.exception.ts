import { PreconditionFailedException } from '@nestjs/common';

export class FailedToUpdateMovieException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_update_movie', error);
    }
}
