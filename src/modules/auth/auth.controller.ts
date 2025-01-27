import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ValidateAuthDto } from './dto/validate-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	public async login(@Body() _loginAuthDto: LoginAuthDto) {
		const auth = await this.authService.login(_loginAuthDto);

		if (!auth) {
			return {
				data: null,
				message: 'User authenticated error',
				status: HttpStatus.CONFLICT,
			};
		}

		return {
			data: auth,
			message: 'User authenticated succesfully',
			status: HttpStatus.OK,
		};
	}

	@Post('/validate')
	public async revalidateAuth(@Body() _validateAuthDto: ValidateAuthDto) {
		const auth = await this.authService.validate(_validateAuthDto);

		if (!auth) {
			return {
				data: null,
				message: 'User authenticated error',
				status: HttpStatus.CONFLICT,
			};
		}

		return {
			data: auth,
			message: 'User validated succesfully',
			status: HttpStatus.OK,
		};
	}
}
