import { PreconditionFailedException } from '@nestjs/common';

export class FailedToRateMovieException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_rate_movie', error);
    }
}
