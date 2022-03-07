import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieTag } from '../../../common/constants';

export class MovieDto {
    @ApiPropertyOptional()
    _id?: string;

    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    director: string;

    @ApiPropertyOptional()
    cast: string;

    @ApiPropertyOptional({ enum: MovieTag, isArray: true })
    tags: MovieTag[];

    @ApiPropertyOptional()
    rating: string;
}
