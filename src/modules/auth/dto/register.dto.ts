import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum } from 'class-validator';
import { Trim } from 'class-sanitizer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../common/constants';

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'Please provide user email.' })
    @Trim()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide user name.' })
    @Trim()
    name: string;

    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole)
    @IsNotEmpty({ message: 'Please provide user role.' })
    role: UserRole;

    @ApiProperty({ minLength: 8 })
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Please provide a valid password',
    })
    @IsNotEmpty({ message: 'Please provide password.' })
    password: string;
}
