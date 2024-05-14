import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class ValidateOTPAuthDto {
	@ApiProperty()
	@IsString()
	@Length(6, 6)
	otp: string;

	@ApiProperty()
	@IsString()
	@IsEmail()
	email: string;
}
