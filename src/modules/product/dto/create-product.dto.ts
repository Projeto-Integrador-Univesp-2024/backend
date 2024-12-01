import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
	@ApiProperty()
	@IsInt()
	guardianId: number;

	@ApiProperty()
	@MaxLength(50)
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	image: string;

	@ApiProperty()
	@IsInt()
	points: number;
}
