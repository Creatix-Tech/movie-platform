import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserFavoriteDto {
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty({ message: 'Please provide favorite boolean flag.' })
    isFavorite?: boolean;
}
