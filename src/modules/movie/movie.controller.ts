import {
    Controller,
    Get,
    UseGuards,
    Post,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    Put, Query, Patch, Req,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { AccessControlGuard } from '../../common/guards/access-control.guard';
import { UserRoles } from '../../common/decorators/user-roles.decorator';
import { UserRole } from '../../common/constants';
import { PageDto } from '../../common/dto';
import { MovieService } from './movie.service';
import { CreateMovieDto, MovieDto, RateMovieDto, UpdateMovieDto, MoviePageOptionsDto } from './dto';
import { UserRolesGuard } from '../../common/guards/user-roles.guard';

@Controller('movies')
@ApiTags('Movies')
@UseGuards(AccessControlGuard, UserRolesGuard)
@ApiBearerAuth()
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    @UserRoles(UserRole.ADMIN, UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        isArray: true,
        type: MovieDto,
        description: 'Successfully retrieved movies'
    })
    async getMovies(@Query() params: MoviePageOptionsDto): Promise<PageDto<MovieDto>> {
        return this.movieService.getAllMovies(params);
    }

    @Get('/:id')
    @UserRoles(UserRole.ADMIN, UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: MovieDto,
        description: 'Successfully retrieved movie by ID'
    })
    async getMovieById(@Param('id') id: string): Promise<MovieDto> {
        return this.movieService.getMovieById(id);
    }

    @Post()
    @UserRoles(UserRole.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: MovieDto,
        description: 'Successfully created a movie'
    })
    @ApiBody({
        description: 'CreateMovieDto',
        type: CreateMovieDto,
        required: true
    })
    async createMovie(@Body() data: CreateMovieDto): Promise<MovieDto> {
        return this.movieService.createMovie(data);
    }

    @Put('/:id')
    @UserRoles(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: MovieDto,
        description: 'Successfully updated movie by ID'
    })
    @ApiBody({
        description: 'UpdateMovieDto',
        type: UpdateMovieDto,
        required: true
    })
    async updateMovie(
        @Param('id') id: string,
        @Body() data: UpdateMovieDto,
    ): Promise<MovieDto>
    {
        return this.movieService.updateMovie(id, data);
    }

    @Delete('/:id')
    @UserRoles(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Successfully removed movie by ID'
    })
    async removeMovie(@Param('id') id: string): Promise<void> {
        await this.movieService.removeMovie(id);
    }

    @Patch('/:id/rate')
    @UserRoles(UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: MovieDto,
        description: 'Successfully rated movie'
    })
    @ApiBody({
        description: 'RateMovieDto',
        type: RateMovieDto,
        required: true
    })
    async rateMovie(
        @Req() req,
        @Param('id') movieId: string,
        @Body() { rating }: RateMovieDto
    ): Promise<MovieDto>
    {
        return this.movieService.rateMovie(movieId, req.user.userId, rating);
    }
}
