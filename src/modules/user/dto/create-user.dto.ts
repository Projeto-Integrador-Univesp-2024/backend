import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsInt()
	usertypeId: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	name?: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	emailVerified?: string;

	@ApiProperty()
	@IsInt()
	age: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	image?: string;
}
