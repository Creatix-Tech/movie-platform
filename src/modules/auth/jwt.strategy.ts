import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { ServiceConfig } from '../../common/services/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly serviceConfig: ServiceConfig,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: serviceConfig.jwtSecret,
        });
    }

    async validate(payload: any) {
        return pick(payload, ['userId', 'email', 'role']);
    }
}
