import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../../common/constants';

export class UserDto {
    @ApiPropertyOptional()
    _id?: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional({ enum: UserRole })
    role: UserRole;

    @ApiPropertyOptional()
    favorites: string[];
}
