import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsInt()
	userTypeId: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	name?: string;

	@ApiProperty()
	@IsString()
	@IsStrongPassword()
	password: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	emailVerified?: string;

	@ApiProperty()
	@IsDateString()
	dateOfBirth: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	image?: string;
}
