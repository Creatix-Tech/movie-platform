import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MovieModel } from '../movie/movie.model';

@Module({
    imports: [MongooseModule.forFeature([UserModel, MovieModel])],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService],
})
export class UserModule {}
