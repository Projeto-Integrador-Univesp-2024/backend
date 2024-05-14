import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/config/database/prisma.service';
import { UserService } from '../user/user.service';
import { UserTypes } from 'src/enums/userType';
import { ChildService } from '../child/child.service';
import { MailService } from '../mail/mail.service';
import { AccountService } from '../account/account.service';
import * as speakeasy from 'speakeasy';
import { ValidateOTPAuthDto } from './dto/validate-otp-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly accountService: AccountService,
		private readonly childService: ChildService,
		private readonly mailService: MailService,
		private readonly jwtService: JwtService,
	) {}

	private generateOtp(): { code: string; secret: string } {
		const secret = speakeasy.generateSecret({ length: 20 });

		const code = speakeasy.totp({
			secret: secret.base32,
			encoding: 'base32',
		});

		return {
			code,
			secret,
		};
	}

	async create(_createAuthDto: CreateAuthDto) {
		const userType = await this.userService.findOneByNameUserType(
			_createAuthDto.userType,
		);

		const userExists = await this.userService.findOneByEmailAndUserType(
			_createAuthDto.email,
			userType.id,
		);

		if (!userExists) {
			const user = await this.userService.create({
				name: _createAuthDto.name,
				email: _createAuthDto.email,
				age: _createAuthDto.age,
				image: _createAuthDto.image,
				usertypeId: userType.id,
			});

			this.accountService.create({
				userId: user.id,
				type: _createAuthDto.userType,
				provider: 'Email',
				providerAccountId: 'Email',
			});

			if (_createAuthDto.userType === UserTypes.CHILD) {
				await this.childService.create({
					userId: user.id,
				});
			}

			return {
				data: user,
				message: `User ${user.id} created successfully`,
				status: HttpStatus.CREATED,
			};
		}

		return {
			data: null,
			message: 'User already created',
			status: HttpStatus.CONFLICT,
		};
	}

	async validateEmail(email: string) {
		try {
			const token = this.generateOtp();
			const user = await this.userService.findOneByEmailAndUserType(
				email,
				2,
			);
			if (user) {
				const account = await this.accountService.findOneByUserId(
					user.id,
				);

				if (account) {
					await this.accountService.update(account.id, {
						access_token: token.code,
						token_type: 'OTP',
						id_token: token.secret['base32'],
					});
				}
			}

			await this.mailService.enviarOtp(email, token.code);

			return {
				data: { email: email, otp: token.code },
				message: 'OTP gerado com sucesso e enviado para o email',
				status: HttpStatus.CREATED,
			};
		} catch (error) {
			return {
				data: null,
				message: error,
				status: HttpStatus.CONFLICT,
			};
		}
	}

	async validateOTP({ otp, email }: ValidateOTPAuthDto) {
		try {
			const user = await this.userService.findOneByEmailAndUserType(
				email,
				2,
			);
			if (!user)
				return {
					data: null,
					message: 'User UNAUTHORIZED',
					status: HttpStatus.UNAUTHORIZED,
				};

			const accounts =
				await this.accountService.findOneByAccessTokenAndUserId(
					otp,
					user.id,
				);

			if (!accounts)
				return {
					data: null,
					message: 'Account not found',
					status: HttpStatus.CONFLICT,
				};

			const payload = {
				username: user.email,
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

			await this.accountService.update(accounts.id, {
				access_token: null,
			});

			return {
				data: {
					accessToken,
					refreshToken,
				},
				message: 'User authenticaded',
				status: HttpStatus.ACCEPTED,
			};
		} catch (error) {
			console.error(error);
			return {
				data: null,
				message: error,
				status: HttpStatus.CONFLICT,
			};
		}
	}

	findAll() {
		return this.prisma.child.findMany();
	}

	findOneByEmail(email: string) {
		return `This action returns a #${email} auth`;
	}

	update(id: number, _updateAuthDto: UpdateAuthDto) {
		return this.userService.update(id, _updateAuthDto);
	}

	remove(id: number) {
		return this.userService.remove(id);
	}
}
