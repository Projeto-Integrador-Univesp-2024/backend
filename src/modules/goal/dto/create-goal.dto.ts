import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGoalDto {
	@ApiProperty()
	@IsInt()
	childId: number;

	@ApiProperty()
	@IsInt()
	@IsOptional()
	productId: number;

	@ApiProperty()
	@IsString()
	@MaxLength(50)
	title: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsInt()
	@IsOptional()
	points: number;
}
