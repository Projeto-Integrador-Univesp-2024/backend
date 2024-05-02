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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	create(@Body() _createAuthDto: CreateAuthDto) {
		return this.authService.create(_createAuthDto);
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
