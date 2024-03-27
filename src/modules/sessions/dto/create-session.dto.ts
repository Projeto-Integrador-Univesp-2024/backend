import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSessionDto {
	@ApiProperty()
	@IsInt()
	userId: number;

	@ApiProperty()
	expires: Date;

	@ApiProperty()
	@IsString()
	@MaxLength(255, {
		message: '',
	})
	sessionToken: string;

	@ApiProperty()
	@IsOptional()
	deleted?: Date;
}
