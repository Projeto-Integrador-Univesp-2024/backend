import { ApiProperty } from '@nestjs/swagger';
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	NotEquals,
} from 'class-validator';
import { UserTypes } from 'src/enums/userType';

export class CreateAuthDto {
	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsNumber()
	age: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	image?: string;

	@ApiProperty()
	@IsEnum(UserTypes)
	@NotEquals(UserTypes[UserTypes.ADMIN])
	public userType: UserTypes;
}
