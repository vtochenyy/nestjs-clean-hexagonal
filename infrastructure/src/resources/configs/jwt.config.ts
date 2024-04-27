import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
    return {
        secret: configService.get('JWT_SECRET'),
        global: true,
        signOptions: {
            expiresIn: configService.get('TOKEN_EXPIRES'),
            algorithm: configService.get('TOKEN_ALGO'),
        },
    };
};
