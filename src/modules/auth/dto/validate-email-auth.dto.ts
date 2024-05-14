import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateEmailAuthDto {
	@ApiProperty()
	@IsString()
	email: string;
}
