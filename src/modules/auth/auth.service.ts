import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';
import { ValidateAuthDto } from './dto/validate-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthType } from './auth';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly sessionService: SessionService,
	) {}

	public async login(
		_loginAuthDto: LoginAuthDto,
	): Promise<AuthType.Login | null> {
		try {
			const user = await this.userService.validate(
				_loginAuthDto.email,
				_loginAuthDto.password,
			);

			if (!user) return null;

			const payload = {
				username: user.email,
				password: user.password,
				sub: {
					name: user.name,
				},
			};

			const accessToken = await this.jwtService.signAsync(payload, {
				expiresIn: '1h',
				secret: process.env.jwtSecretKey,
			});

			const refreshToken = await this.jwtService.signAsync(payload, {
				expiresIn: '7d',
				secret: process.env.jwtRefreshToken,
			});

			await this.sessionService.create({
				userId: user.id,
				expires: new Date(Date.now() + 3600000),
				sessionToken: accessToken,
			});

			return {
				accessToken,
				refreshToken,
				user,
			};
		} catch (error) {
			return null;
		}
	}

	public async validate(
		_validateAuth: ValidateAuthDto,
	): Promise<AuthType.Login | null> {
		const session = await this.sessionService.findOne(_validateAuth.id);

		if (!session)
			throw new HttpException(
				'Session not found',
				HttpStatus.UNAUTHORIZED,
			);

		if (_validateAuth.token !== session.sessionToken)
			throw new HttpException('Token incorrect', HttpStatus.UNAUTHORIZED);

		const diffInMs = session.expires.getTime() - new Date().getTime();

		if (session.expires < new Date()) {
			if (diffInMs < 3600000) {
				throw new HttpException(
					'Token expired more than 1 hour ago',
					HttpStatus.UNAUTHORIZED,
				);
			} else {
				return await this.revalidate(_validateAuth.id);
			}
		}
		return null;
	}

	private async revalidate(userId: number): Promise<AuthType.Login | null> {
		const user = await this.userService.findOne(userId);

		if (!user)
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);

		return await this.login({
			email: user.email,
			password: user.password,
		});
	}
}
