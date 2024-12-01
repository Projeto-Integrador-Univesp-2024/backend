import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ValidateAuthDto {
	@ApiProperty()
	@IsString()
	token: string;

	@ApiProperty()
	@IsInt()
	id: number;
}
