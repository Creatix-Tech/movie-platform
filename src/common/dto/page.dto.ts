import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
    @ApiProperty({ isArray: true })
    data: T[];

    @ApiProperty()
    meta: PageMetaDto;
}
