import { IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RateMovieDto {
    @ApiProperty({
        minimum: 1,
        maximum: 10,
        default: 5,
    })
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;
}
