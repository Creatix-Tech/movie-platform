import { NotFoundException } from '@nestjs/common';

export class MovieNotFoundException extends NotFoundException {
    constructor(error?: string) {
        super('error.movie_not_found', error);
    }
}
