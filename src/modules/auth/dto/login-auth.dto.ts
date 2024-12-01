import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class LoginAuthDto {
	@ApiProperty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsString()
	@IsStrongPassword()
	password: string;
}
