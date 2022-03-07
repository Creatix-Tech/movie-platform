import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
    constructor(error?: string) {
        super('error.user_already_exists', error);
    }
}
