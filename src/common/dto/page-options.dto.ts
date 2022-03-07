import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PageOptionsDto {
    @ApiPropertyOptional({
        minimum: 0,
        default: 0,
    })
    @IsOptional()
    skip?: number = 0;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 10,
        default: 10,
    })
    @IsOptional()
    limit?: number = 10;
}
