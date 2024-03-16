import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

@ApiTags('Accounts')
export class CreateAccountDto {
	@ApiProperty()
	@IsInt()
	userId: number;

	@ApiProperty()
	@IsString()
	@MaxLength(255, {
		message:
			'[Type] is too long. Maximal length is $constraint1 characters, but actual is $value',
	})
	type: string;

	@ApiProperty()
	@IsString()
	@MaxLength(255, {
		message:
			'[Provider] is too long. Maximal length is $constraint1 characters, but actual is $value',
	})
	provider: string;

	@ApiProperty()
	@IsString()
	@MaxLength(255, {
		message:
			'[Provider Account Id] is too long. Maximal length is $constraint1 characters, but actual is $value',
	})
	providerAccountId: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	refresh_token?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	access_token?: string;

	@ApiProperty()
	@IsInt()
	@IsOptional()
	expires_at?: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	id_token?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	scope?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	session_state?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	token_type?: string;
}
