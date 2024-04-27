import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { User } from '../../../../core/src/domain/user/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            algorithms: configService.getOrThrow('TOKEN_ALGO'),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
        });
    }

    async validate({ login, id }: { login: Pick<User, 'login'>; id: Pick<User, 'id'> }) {
        return { login, id };
    }
}
