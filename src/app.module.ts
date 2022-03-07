import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ServiceConfig } from './common/services/config.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [CommonModule],
            useFactory: (serviceConfig: ServiceConfig) => ({
                uri: serviceConfig.dbURI,
                useCreateIndex: true
            }),
            inject: [ServiceConfig]
        }),
        AuthModule,
        UserModule,
        MovieModule
    ]
})
export class AppModule {}
