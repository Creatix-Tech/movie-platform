import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
    @ApiProperty()
    skip: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    itemCount: number;
}
