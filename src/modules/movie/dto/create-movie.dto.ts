import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { MovieTag } from '../../../common/constants';

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide movie title.' })
    @Trim()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide movie description.' })
    @Trim()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide movie director.' })
    @Trim()
    director: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide movie cast.' })
    @Trim()
    cast: string;

    @ApiProperty({ enum: MovieTag, isArray: true })
    @IsEnum(MovieTag, { each: true })
    @IsNotEmpty({ message: 'Please provide movie tags.' })
    tags: MovieTag[];
}
