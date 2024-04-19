import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsInt()
	usertypeId: number;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	emailVerified: string;

	@ApiProperty()
	@IsInt()
	age: number;

	@ApiProperty()
	@IsString()
	image: string;
}
