import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/config/utils.service';

@Injectable()
export class JwtGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly utilsService: UtilsService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.utilsService.extractTokenFromHeader(request);

		if (!token) throw new UnauthorizedException();

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get<string>('jwtSecretToken'),
			});

			request['user'] = payload;
		} catch (error) {
			throw new UnauthorizedException();
		}

		return true;
	}
}
