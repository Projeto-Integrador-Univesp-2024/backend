import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidateEmailAuthDto } from './dto/validate-email-auth.dto';
import { ValidateOTPAuthDto } from './dto/validate-otp-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	create(@Body() _createAuthDto: CreateAuthDto) {
		return this.authService.create(_createAuthDto);
	}

	@Post('/login')
	validateEmail(@Body() _validateEmailAuthDto: ValidateEmailAuthDto) {
		return this.authService.validateEmail(_validateEmailAuthDto.email);
	}

	@Post('/login/confirmation')
	validateOTP(@Body() _validateOTPAuthDto: ValidateOTPAuthDto) {
		return this.authService.validateOTP(_validateOTPAuthDto);
	}

	@Get()
	findAll() {
		return this.authService.findAll();
	}

	@Get(':email')
	findByEmail(@Param('email') email: string) {
		return this.authService.findOneByEmail(email);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() _updateAuthDto: UpdateAuthDto) {
		return this.authService.update(+id, _updateAuthDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authService.remove(+id);
	}
}
