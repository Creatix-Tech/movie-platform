import {
    Controller,
    Get,
    UseGuards,
    Req,
    Param,
    Put,
    Body,
    UnauthorizedException,
    HttpCode,
    HttpStatus,
    Patch,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { AccessControlGuard } from '../../common/guards/access-control.guard';
import { UserService } from './user.service';
import { UpdateUserDto, UpdateUserFavoriteDto, UserDto } from './dto';
import { UserRoles } from '../../common/decorators/user-roles.decorator';
import { UserRole } from '../../common/constants';

@Controller('users')
@ApiTags('Users')
@UseGuards(AccessControlGuard)
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    @UserRoles(UserRole.ADMIN, UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully retrieved user by ID'
    })
    async getUser(@Param('id') id: string): Promise<UserDto> {
        return this.userService.getUserById(id);
    }

    @Put('/:id')
    @UserRoles(UserRole.ADMIN, UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully updated user by ID'
    })
    @ApiBody({
        description: 'UpdateUserDto',
        type: UpdateUserDto,
        required: true
    })
    async updateUser(
        @Req() req,
        @Param('id') id: string,
        @Body() data: UpdateUserDto
    ): Promise<UserDto>
    {
        UserController.validateUserId(req.user.userId, id);
        return this.userService.updateUser(id, data);
    }

    @Patch('/:movieId/favorite')
    @UserRoles(UserRole.USER)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully updated favorite movie'
    })
    @ApiBody({
        description: 'UpdateUserFavoriteDto',
        type: UpdateUserFavoriteDto,
        required: true
    })
    async updateFavorite(
        @Req() req,
        @Param('movieId') movieId: string,
        @Body() { isFavorite }: UpdateUserFavoriteDto
    ): Promise<UserDto>
    {
        return this.userService.updateUserFavoriteMovie(req.user.userId, movieId, isFavorite);
    }

    private static validateUserId(reqUserId: string, id: string): void {
        if (reqUserId !== id) {
            throw new UnauthorizedException({ message: 'Not Authorized' });
        }
    }
}
